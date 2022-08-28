const Mosque = require("../../models/muslim_user_models/mosqueModel");
const MosqueNamazTimes = require("../../models/muslim_user_models/mosqueNamazTimesModel");
const User = require("../../models/common_models/userModel");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();
const moment = require("moment");

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
  NEW_MOSQUE_ADDITION,
  NEW_MOSQUE_UNVERIFIED,
  consensus_notificaion_logo,
  new_mosque_notification_logo,
  rejected_notification_logo,
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
          //Sign a notification for users
          const title = `New Mosque`.toUpperCase();
          const body = `${addedBy.toUpperCase()} feels that mosque ${mosqueName} is not yet present in the system and asks you to upvote so new Mosque could be added. Total ${
            peopleAround.length
          } people are notified! Be true to the good cause, give your perfect vote`;

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          console.log(consensus_notificaion_logo);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            MOSQUE_CONSENSUS,
            newMosqueData._id,
            consensus_notificaion_logo
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

    const mosqueToBeAdded = await Mosque.findOne({
      _id: mosqueId,
      "receivers.username": username,
    });

    const index = await mosqueToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!mosqueToBeAdded?.receivers[index].hasVoted) {
      const updatedMosque = await Mosque.findOneAndUpdate(
        { _id: mosqueId, "receivers.username": username },
        { $inc: { upVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedMosque.upVotes > updatedMosque.downVotes &&
        updatedMosque.upVotes + updatedMosque.downVotes ==
          updatedMosque.receivers.length
      ) {
        const verifiedMosque = await Mosque.findOneAndUpdate(
          { _id: mosqueId },
          { verified: true }
        );

        if (verifiedMosque) {
          const date = new Date().toLocaleDateString().replaceAll("/", "-");
          let namazTimes = await fetch(
            `https://api.aladhan.com/v1/timings/${date}?latitude=${mosqueToBeAdded.location.coordinates[1]}&longitude=${mosqueToBeAdded.location.coordinates[0]}&method=2`
          );

          namazTimes = await namazTimes.json();
          let timings = namazTimes.data.timings;

          const updateNamazTimes = await MosqueNamazTimes.create({
            mosqueId: mosqueId,
            updatedBy: "default",
            fajr: {
              startTime: timings.Fajr,
              endTime: moment(timings.Fajr, "HH:mm")
                .add(30, "minutes")
                .format("HH:mm"),
            },
            zuhr: {
              startTime: timings.Dhuhr,
              endTime: moment(timings.Dhuhr, "HH:mm")
                .add(60, "minutes")
                .format("HH:mm"),
            },
            asr: {
              startTime: timings.Asr,
              endTime: moment(timings.Asr, "HH:mm")
                .add(40, "minutes")
                .format("HH:mm"),
            },
            maghrib: {
              startTime: timings.Maghrib,
              endTime: moment(timings.Maghrib, "HH:mm")
                .add(30, "minutes")
                .format("HH:mm"),
            },
            isha: {
              startTime: timings.Isha,
              endTime: moment(timings.Isha, "HH:mm")
                .add(60, "minutes")
                .format("HH:mm"),
            },
          });

          //Sign a notification for users
          const title = `New Mosque Added`.toUpperCase();
          const body = `MOSQUE: ${mosqueToBeAdded.mosqueName} was added to system. You may consider making it as primary.`;

          let mosque_long = mosqueToBeAdded.location.coordinates[0];
          let mosque_lat = mosqueToBeAdded.location.coordinates[1];

          let peopleAround = await findNearByPeople(mosque_long, mosque_lat);

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            NEW_MOSQUE_ADDITION,
            mosqueToBeAdded._id,
            new_mosque_notification_logo
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
                msg: "New mosque was added to system.",
                data: mosqueToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (mosqueToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: mosqueToBeAdded,
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
  console.log("cast Down vote API hit");
  try {
    const { mosqueId, username } = req.body;

    const mosqueToBeAdded = await Mosque.findOne({
      _id: mosqueId,
      "receivers.username": username,
    });
    const index = await mosqueToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!mosqueToBeAdded?.receivers[index].hasVoted) {
      const updatedMosque = await Mosque.findOneAndUpdate(
        { _id: mosqueId, "receivers.username": username },
        { $inc: { downVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedMosque.upVotes < updatedMosque.downVotes &&
        updatedMosque.upVotes + updatedMosque.downVotes ==
          updatedMosque.receivers.length
      ) {
        const verifiedMosque = await Mosque.findOneAndUpdate(
          { _id: mosqueId },
          { verified: false }
        );

        if (verifiedMosque) {
          //Sign a notification for users
          const title = `MOSQUE NOT VERIFIED`.toUpperCase();
          const body = `MOSQUE: ${mosqueToBeAdded.mosqueName} was marked unverified by many users and could not be added.`;

          let mosque_long = mosqueToBeAdded.location.coordinates[0];
          let mosque_lat = mosqueToBeAdded.location.coordinates[1];

          let peopleAround = await findNearByPeople(mosque_long, mosque_lat);

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            NEW_MOSQUE_UNVERIFIED,
            mosqueToBeAdded._id,
            rejected_notification_logo
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
                msg: "New mosque could not be added",
                data: mosqueToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (mosqueToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: mosqueToBeAdded,
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

module.exports = {
  getAllMosques,
  addMosque,
  getClosestMosques,
  getUnverifiedMosquesAroundUser,
  getMosqueById,
  castUpvote,
  castDownvote,
};
