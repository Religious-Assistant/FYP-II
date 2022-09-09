const Temple = require("../../models/hindu_user_models/templeModel");
const User = require("../../models/common_models/userModel");
require("dotenv").config();

const {
  findNearByPeople,
  notifyUsers,
  getNotificationReceivers,
  saveNotificationForMuslimUser,
  saveNotificationForHinduUser,
} = require("../utils/utils");

const {
  ADD_NEW_TEMPLE_CHANNEL_ID,
  appLogo,
  TEMPLE_CONSENSUS,
  NEW_TEMPLE_ADDITION,
  NEW_TEMPLE_UNVERIFIED,
  consensus_notificaion_logo,
  new_temple_notification_logo,
  rejected_notification_logo,
} = require("../utils/constants");

const getAllTemples = async (req, res) => {
  console.log("Find All Temples API hit");
  try {
    const allTemples = await Temple.find({});
    if (allTemples) {
      res.status(200).send({ success: true, data: allTemples });
    } else {
      res.status(200).send({ msg: "Could not find Temples", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTempleById = async (req, res) => {
  console.log("Get Temple By ID API Hit", req.body);
  try {
    const { templeId } = req.body;
    const temple = await Temple.findOne({ _id: templeId });

    if (temple) {
      res.status(200).send({ success: true, data: temple });
    } else {
      res.status(200).send({ msg: "Could not find temple", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getClosestTemples = async (req, res) => {
  console.log("Find closest Temples API hit", req.body);

  const { longitude, latitude } = req.body;

  try {
    const nearTemples = await Temple.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: 1000 * process.env.CLOSEST_DISTANCE,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
      { $match: { verified: true } },
    ]);

    res.status(200).send({
      msg: "Here are closest Temples",
      success: true,
      data: nearTemples,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUnverifiedTemplesAroundUser = async (req, res) => {
  console.log("Get Unverified Temples API hit");
  const { longitude, latitude } = req.body;
  try {
    const unverifiedNearTemples = await Temple.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: 1000 * process.env.CLOSEST_DISTANCE,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
      { $match: { verified: false } },
    ]);
    res.status(200).send({
      msg: "Here are Unverified Temples around you",
      success: true,
      data: unverifiedNearTemples,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addTemple = async (req, res) => {

  console.log("Add Temple API hit");

  const { latitude, longitude, templeName, addedBy } = req.body;  

  try {
    const user = await User.findOne({ username: addedBy });

    if (user) {
      let adder_longitude = user.location.coordinates[0];
      let adder_latitude = user.location.coordinates[1];

      let peopleAround = await findNearByPeople(
        adder_longitude,
        adder_latitude
      );

      const voteCasters = [];
      await peopleAround.map((person) => {
        if(person!==addedBy){
          voteCasters.push({ username: person, hasVoted: false });
        }
      });

      if (longitude && latitude) {

        const newTempleData = await Temple.create({
          templeName: templeName,
          addedBy: addedBy,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          receivers: voteCasters,
        });

        if (newTempleData) {
          //Sign a notification for users
          const title = `New Temple`.toUpperCase();
          const body = `${addedBy.toUpperCase()} feels that Temple ${templeName} is not yet present in the system and asks you to upvote so new temple could be added`

          const recepients = await getNotificationReceivers(peopleAround, 0);
          saveNotificationForHinduUser(
            recepients,
            title,
            body,
            TEMPLE_CONSENSUS,
            newTempleData._id,
            consensus_notificaion_logo
          )
            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_NEW_TEMPLE_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "Your request to add new Temple has been spread to people around you.",
                data: { newTempleData, totalReceivers: totalReceivers },
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        } else {
          res.status(200).send({ msg: "Could not add temple", success: false });
        }
      } else {
        res.status(200).send({ msg: "Invalid Locaton", success: false });
      }
    } else {
      res.status(200).send({ msg: "User Does not exist", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const castUpvote = async (req, res) => {
  console.log("Cast Upvote API hit");
  try {
    const { templeId, username } = req.body;

    const templeToBeAdded = await Temple.findOne({
      _id: templeId,
      "receivers.username": username,
    });

    const index = await templeToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!templeToBeAdded?.receivers[index].hasVoted) {
      const updatedTemple = await Temple.findOneAndUpdate(
        { _id: templeId, "receivers.username": username },
        { $inc: { upVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedTemple.upVotes > updatedTemple.downVotes &&
        updatedTemple.upVotes + updatedTemple.downVotes ==
          updatedTemple.receivers.length
      ) {
        const verifiedTemple = await Temple.findOneAndUpdate(
          { _id: templeId },
          { verified: true }
        );

        if (verifiedTemple) {
          //Sign a notification for users
          const title = `New temple Added`.toUpperCase();
          const body = `Temple: ${templeToBeAdded.templeName} was added to system. You may consider making it as primary.`;

          let temple_long = templeToBeAdded.location.coordinates[0];
          let temple_lat = templeToBeAdded.location.coordinates[1];

          let peopleAround = await findNearByPeople(temple_long, temple_lat);
          let filteredPeople=peopleAround.filter(p=>p!==username)
          const recepients = await getNotificationReceivers(filteredPeople, 0);
          saveNotificationForHinduUser(
            recepients,
            title,
            body,
            NEW_TEMPLE_ADDITION,
            templeToBeAdded._id,
            new_temple_notification_logo
          )
            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_NEW_TEMPLE_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "New temple was added to system.",
                data: templeToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (templeToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: templeToBeAdded,
        });
      } else {
        res.status(400).send({ success: false, msg: `Could not cast vote` });
      }
    } else {
      const result = await Temple.findOne({ _id: templeId });
      res
        .status(400)
        .send({ success: false, msg: `Alredy casted`, data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const castDownvote = async (req, res) => {
  console.log("cast Down vote API hit");
  try {
    const { templeId, username } = req.body;

    const templeToBeAdded = await Temple.findOne({
      _id: templeId,
      "receivers.username": username,
    });
    const index = await templeToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!templeToBeAdded?.receivers[index].hasVoted) {
      const updatedTemple = await Temple.findOneAndUpdate(
        { _id: templeId, "receivers.username": username },
        { $inc: { downVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedTemple.upVotes < updatedTemple.downVotes &&
        updatedTemple.upVotes + updatedTemple.downVotes ==
          updatedTemple.receivers.length
      ) {
        const verifiedTemple = await Temple.findOneAndUpdate(
          { _id: templeId },
          { verified: false }
        );

        if (verifiedTemple) {
          //Sign a notification for users
          const title = `Temple NOT VERIFIED`.toUpperCase();
          const body = `Temple: ${templeToBeAdded.templeName} was marked unverified by many users and could not be added.`;

          let temple_long = templeToBeAdded.location.coordinates[0];
          let temple_lat = templeToBeAdded.location.coordinates[1];

          let peopleAround = await findNearByPeople(temple_long, temple_lat);
          //TODO: changed
          delete peopleAround[username]
          let filteredPeople=peopleAround.filter(p=>p!==username)
          const recepients = await getNotificationReceivers(filteredPeople, 0);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            NEW_TEMPLE_UNVERIFIED,
            templeToBeAdded._id,
            rejected_notification_logo
          )
            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_NEW_TEMPLE_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "New temple could not be added",
                data: templeToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (templeToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: templeToBeAdded,
        });
      } else {
        res.status(400).send({ success: false, msg: `Could not cast vote` });
      }
    } else {
      const result = await Temple.findOne({ _id: templeId });
      res
        .status(400)
        .send({ success: false, msg: `Alredy casted`, data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllTemples,
  addTemple,
  getClosestTemples,
  getUnverifiedTemplesAroundUser,
  getTempleById,
  castUpvote,
  castDownvote,
};
