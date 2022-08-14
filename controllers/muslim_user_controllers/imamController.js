const Imam = require("../../models/muslim_user_models/imamModel");
const User = require("../../models/common_models/userModel");
const Mosque = require("../../models/muslim_user_models/mosqueModel");
const MuslimPreference = require("../../models/muslim_user_models/muslimUserPreferencesModel");

const {
  findNearByPeople,
  getNotificationReceivers,
  saveNotificationForMuslimUser,
  notifyUsers,
} = require("../utils/utils");
const { IMAM_CONSENSUS, ADD_IMAM_CHANNEL_ID, IMAM_VERIFIED, appLogo, IMAM_UNVERIFIED, consensus_notificaion_logo, imam_notification_logo, rejected_notification_logo } = require("../utils/constants");

const becomeImam = async (req, res) => {
  console.log("Become Imam API hit", req.body);

  try {
    const { username, mosqueId } = req.body;

    const user = await User.findOne({ username });
    const mosque = await Mosque.findOne({ _id: mosqueId });
    if (!user || !mosque) {
      return res
        .status(200)
        .send({ msg: "User Or Mosque Does not exist", success: false });
    }

    let adder_longitude = user.location.coordinates[0];
    let adder_latitude = user.location.coordinates[1];

    let peopleAround = await findNearByPeople(adder_longitude, adder_latitude);

    const voteCasters = [];
    await peopleAround.map((person) => {
      voteCasters.push({ username: person, hasVoted: false });
    });

    const imamaData = await Imam.create({
      username: username,
      mosqueId: mosqueId,
      receivers: voteCasters,
    });

    if (imamaData) {

      //TODO: Discuss about: Made this Mosque as primary of Imam to which he want ti become imam
      await MuslimPreference.findOneAndUpdate({ username },{$set:{primaryMosque:imamaData.mosqueId}},{new:true});

      //Sign a notification for users
      const title = `IMAM FOR ${mosque.mosqueName}`.toUpperCase();
      const body = `${username.toUpperCase()} claims that he is Imam of ${mosque.mosqueName.toUpperCase()}.`;

      //TODO: Should return only Muslim users
      const recepients = await getNotificationReceivers(peopleAround, 1);
      saveNotificationForMuslimUser(
        recepients,
        title,
        body,
        IMAM_CONSENSUS,
        imamaData._id, //cause by: imam id
        consensus_notificaion_logo,
      )
        .then(async (data) => {
          const totalReceivers = await notifyUsers(
            title,
            body,
            recepients,
            ADD_IMAM_CHANNEL_ID,
            user.avatar
          );

          res.status(200).send({
            success: true,
            msg: "Consensus notification sent to users around you.",
            data: { imamaData, totalReceivers: totalReceivers },
          });
        })
        .catch((error) => {
          res
            .status(400)
            .send({ msg: "Could not notify users", success: false });
        });
    } else {
      res.status(200).send({ msg: "Could not apply for Imam", success: false });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Become Imam" });
  }
};

const getImamById = async (req, res) => {
  console.log("Get Imam By ID API Hit");
  try {
    const { imamId } = req.body;
    
    const imam = await Imam.findOne({ _id: imamId });

    if (imam) {
      const mosque=await Mosque.findOne({_id:imam.mosqueId})
      if(mosque){
        let data={...imam._doc, mosque:mosque}
        res.status(200).send({ success: true, data: data });
      } 
      else{
        res.status(200).send({ success: false, msg:"No such Mosque" });
      }
    } else {
      res.status(200).send({ msg: "Could not find Imam", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const casteUpVoteForImam = async (req, res) => {
  console.log("Cast Upvote For IMAM API hit");
  try {
    const { imamId, username } = req.body;

    const imamToBeAdded = await Imam.findOne({
      _id: imamId,
      "receivers.username": username,
    });
    const index = await imamToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!imamToBeAdded?.receivers[index].hasVoted) {
      const updatedImamRecord = await Imam.findOneAndUpdate(
        { _id: imamId, "receivers.username": username },
        { $inc: { upVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedImamRecord.upVotes > updatedImamRecord.downVotes &&
        updatedImamRecord.upVotes + updatedImamRecord.downVotes ==
          updatedImamRecord.receivers.length
      ) {
        const verifiedImam = await Imam.findOneAndUpdate(
          { _id: imamId },
          { verified: true }
        );

        if (verifiedImam) {
          //Sign a notification for users
          const title = `IMAM ANNOUNCED`.toUpperCase();
          const body = `${imamToBeAdded.username.toUpperCase()} Has been selected to become imam.`;

          const imamHistory=await User.findOne({username:verifiedImam.username})

          let imamlocation_long = imamHistory.location.coordinates[0];
          let imamlocation_lat = imamHistory.location.coordinates[1];

          let peopleAround = await findNearByPeople(imamlocation_long, imamlocation_lat);

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            IMAM_VERIFIED,
            imamToBeAdded._id,
            imam_notification_logo

          )

            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_IMAM_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "Imam was seleted",
                data: imamToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (imamToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: imamToBeAdded,
        });
      } else {
        res.status(400).send({ success: false, msg: `Could not cast vote` });
      }
    } else {
      const result = await Mosque.findOne({ _id: imamId });
      res
        .status(400)
        .send({ success: false, msg: `Alredy casted`, data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const castDownvoteForImam = async (req, res) => {
  console.log("Cast Upvote For IMAM API hit");
  try {
    const { imamId, username } = req.body;

    const imamToBeAdded = await Imam.findOne({
      _id: imamId,
      "receivers.username": username,
    });
    const index = await imamToBeAdded.receivers.findIndex(
      (candidate) => candidate.username === username
    );

    if (!imamToBeAdded?.receivers[index].hasVoted) {
      const updatedImamRecord = await Imam.findOneAndUpdate(
        { _id: imamId, "receivers.username": username },
        { $inc: { downVotes: 1 }, $set: { "receivers.$.hasVoted": true } },
        { new: true }
      );

      if (
        updatedImamRecord.upVotes < updatedImamRecord.downVotes &&
        updatedImamRecord.upVotes + updatedImamRecord.downVotes ==
          updatedImamRecord.receivers.length
      ) {
        const verifiedImam = await Imam.findOneAndUpdate(
          { _id: imamId },
          { verified: true }
        );

        if (verifiedImam) {
          //Sign a notification for users
          const title = `LEFT UNVERIFIED`.toUpperCase();
          const body = `${imamToBeAdded.username.toUpperCase()} who applied for Imam in Mosque near you could not be verified.`;

          const imamHistory=await User.findOne({username:verifiedImam.username})

          let imamlocation_long = imamHistory.location.coordinates[0];
          let imamlocation_lat = imamHistory.location.coordinates[1];

          let peopleAround = await findNearByPeople(imamlocation_long, imamlocation_lat);

          //TODO: Should return only Muslim users
          const recepients = await getNotificationReceivers(peopleAround, 1);
          saveNotificationForMuslimUser(
            recepients,
            title,
            body,
            IMAM_UNVERIFIED,
            imamToBeAdded._id,
            rejected_notification_logo
          )

            .then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ADD_IMAM_CHANNEL_ID,
                appLogo
              );

              res.status(200).send({
                success: true,
                msg: "Imam Rejected",
                data: imamToBeAdded,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
            });
        }
      } else if (imamToBeAdded) {
        res.status(200).send({
          success: true,
          msg: `Vote Casted Successfully`,
          data: imamToBeAdded,
        });
      } else {
        res.status(400).send({ success: false, msg: `Could not cast vote` });
      }
    } else {
      const result = await Mosque.findOne({ _id: imamId });
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
  becomeImam,
  getImamById,
  casteUpVoteForImam,
  castDownvoteForImam
};
