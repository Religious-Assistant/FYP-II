const Mosque = require("../../models/muslim_user_models/mosqueModel");
const User = require("../../models/common_models/userModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");

const { findNearByPeople, notifyUsers, getNotificationReceivers, saveNotificationForMuslimUser } = require("../utils/utils");
const { ADD_NEW_MOSQUE_CHANNEL_ID, appLogo, MOSQUE_CONSENSUS } = require("../utils/constants");

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
          maxDistance: 1000 * 600, //Display mosques in 600KM
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
          maxDistance: 1000 * 600, //600 KM
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
      if (longitude && latitude) {
        const newMosqueData = await Mosque.create({
          mosqueName: mosqueName,
          addedBy: addedBy,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        });

        if (newMosqueData) {
          //send notification to users around this mosque

          let adder_longitude = user.location.coordinates[0];
          let adder_latitude = user.location.coordinates[1];

          let peopleAround = await findNearByPeople(
            adder_longitude,
            adder_latitude
          );

          //Sign a notification for users
          const title = `${addedBy.toUpperCase()} Requested to add new Mosque`;
          const body = `${addedBy} feels that mosque ${mosqueName} is not yet present in the system and asks you to upvote so new Mosque could be added. Total ${peopleAround.length} people are notified! Be true to the good cause, give your perfect vote`;


          //TODO: Should return only Muslim users
          const recepients=await getNotificationReceivers(peopleAround,1)
          saveNotificationForMuslimUser(recepients, title, body,MOSQUE_CONSENSUS).then(async (data) => {

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

module.exports = {
  getAllMosques,
  addMosque,
  getClosestMosques,
  getUnverifiedMosquesAroundUser,
};
