const Mosque = require("../../models/muslim_user_models/mosqueModel");
const User = require("../../models/common_models/userModel");
require("dotenv").config();

const {
  findNearByPeople,
  notifyUsers,
  getNotificationReceivers,
  saveNotificationForMuslimUser,
} = require("../utils/utils");
const {
  ADD_NEW_MOSQUE_CHANNEL_ID,
  appLogo,
  MOSQUE_CONSENSUS,
} = require("../utils/constants");

const getAllMosques = async (req, res) => {
  console.log("Find All Mosques API hit");
  try {
    const allMosques = await Mosque.find({});
    if (allMosques) {
      res.status(200).send({ success: true, data: allMosques });
    } else {
      res.status(200).send({ msg: "Could not find Mosques", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getMosqueById = async (req, res) => {
  console.log("Get Mosque By ID API Hit");
  try {
    const { mosqueId } = req.body;
    const mosque = await Mosque.findOne({ _id: mosqueId });
    if (mosque) {
      res.status(200).send({ success: true, data: mosque });
    } else {
      res.status(200).send({ msg: "Could not find Mosque", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getClosestMosques = async (req, res) => {
  console.log("Find closest Mosques API hit");

  const { longitude, latitude } = req.body;

  try {
    const nearMosques = await Mosque.aggregate([
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
      msg: "Here are closest Mosques",
      success: true,
      data: nearMosques,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUnverifiedMosquesAroundUser = async (req, res) => {
  console.log("Get Unverified Mosques API hit");
  const { longitude, latitude } = req.body;
  try {
    const unverifiedNearMosques = await Mosque.aggregate([
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
      msg: "Here are Unverified Mosques around you",
      success: true,
      data: unverifiedNearMosques,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addMosque = async (req, res) => {
  console.log("Add Mosque API hit");
  const { latitude, longitude, mosqueName, addedBy } = req.body;

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
        voteCasters.push({ username: person, hasVoted: false });
      });

      if (longitude && latitude) {
        const newMosqueData = await Mosque.create({
          mosqueName: mosqueName,
          addedBy: addedBy,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          receivers: voteCasters,
        });

        if (newMosqueData) {
          //send notification to users around this mosque

          //Sign a notification for users
          const title = `New Mosque`.toUpperCase();
          const body = `${addedBy.toUpperCase()} feels that mosque ${mosqueName} is not yet present in the system and asks you to upvote so new Mosque could be added. Total ${
            peopleAround.length
          } people are notified! Be true to the good cause, give your perfect vote`;

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            MOSQUE_CONSENSUS,
            newMosqueData._id
          )
            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_NEW_MOSQUE_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "Your request to add new Mosque has been spread to people around you.",
                data: { newMosqueData, totalReceivers: totalReceivers },
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        } else {
          res.status(200).send({ msg: "Could not add Mosque", success: false });
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
    const { mosqueId, username } = req.body;

    const voter = await Mosque.findOne({
      _id: mosqueId,
      "receivers.username": username,
    });
    const index = await voter.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!voter?.receivers[index].hasVoted) {
      const result = await Mosque.findOneAndUpdate(
        { _id: mosqueId, "receivers.username": username },
        { $inc: { upVotes: 1 }, $set: { "receivers.$.hasVoted": true } }
      );

      if (
        voter.upVotes > voter.downVotes &&
        voter.upVotes + voter.downVotes == voter.receivers.length
      ) {
        const verifiedMosque = await Mosque.findOneAndUpdate(
          { _id: mosqueId },
          { verified: true }
        );

        if (verifiedMosque) {
          //Send notification of newly added mosque
          // const totalReceivers = await notifyUsers(
          //   title="",
          //   body,
          //   recepients,
          //   ADD_NEW_MOSQUE_CHANNEL_ID,
          //   appLogo
          // );
        }
      }

      if (result) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: result,
        });
      } else {
        res.status(400).send({ success: false, msg: `Could not cast vote` });
      }
    } else {
      const result = await Mosque.findOne({ _id: mosqueId });
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
  console.log("Cast DownVote API hit");
  try {
    const { mosqueId, username } = req.body;

    const result = await Mosque.findOneAndUpdate(
      { _id: mosqueId, receivers: username },
      { $inc: { downVotes: 1 }, $set: { "receivers.hasVoted": true } }
    );

    if (result) {
      res
        .status(200)
        .send({ success: true, msg: `Vote Casted Successfully`, data: result });
    } else {
      res.status(400).send({ success: false, msg: `Could not cast vote` });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllMosques,
  addMosque,
  getClosestMosques,
  getUnverifiedMosquesAroundUser,
  getMosqueById,
  castUpvote,
  castDownvote,
};