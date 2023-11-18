const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");

const User = require("../../models/common_models/userModel");
const MuslimNotification = require("../../models/muslim_user_models/muslimUserNotificationModel");
const HinduNotification = require("../../models/hindu_user_models/hinduUserNotificationModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");

require("dotenv").config();

const jwt_secret = process.env.JWT_KEY;
const { TOKEN_EXPIRE } = require("./constants");

async function hashPassword(password) {
  const newPass = await bcrypt.hash(password, 5);
  return newPass;
}

//Must get user _id
async function createToken(id) {
  return jwt.sign({ _id: id }, jwt_secret, { expiresIn: TOKEN_EXPIRE });
}

//Hepler function
const findNearByPeople = async (longitude, latitude) => {
  const nearUsers = await User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        key: "location",
        maxDistance: 1000 * process.env.CLOSEST_DISTANCE, //Get CLOSEST_DISTANCE KM
        distanceField: "dist.calculated",
        spherical: true,
      },
    },
    { $match: { verified: true } }, //Display to verified users only
  ]);

  const usernames = [];
  await nearUsers.map((user) => {
    usernames.push(user.username);
  });
  return usernames;
};

// Send a message to devices with the registered tokens
async function notifyUsers(title, body, targetDevices, channelId, senderImage) {
  const resp = await admin.messaging().sendMulticast({
    tokens: targetDevices.map((token) => token.deviceToken),
    data: {
      notification: JSON.stringify({
        body: body,
        title: title,
        channelId: channelId + "",
        largeIcon: senderImage,
      }),
    },
  });

  return resp.successCount;
}

async function sendNotificationWithData(
  title,
  body,
  targetDevices,
  channelId,
  senderImage,
  notfData
) {
  const resp = await admin.messaging().sendMulticast({
    tokens: targetDevices.map((token) => token.deviceToken),
    data: {
      notification: JSON.stringify({
        body: body,
        title: title,
        channelId: channelId + "",
        largeIcon: senderImage,
      }),
      payload: notfData,
    },
  });

  return resp.successCount;
}
const saveNotificationForMuslimUser = (
  recepients,
  title,
  statement,
  category,
  notifictionId,
  icon
) => {
  const createOne = (one_receiver) => {
    return new Promise((resolve, reject) => {
      MuslimNotification.create({
        causedBy: notifictionId,
        title: title,
        description: statement,
        receivedBy: one_receiver.username,
        category: category,
        icon: icon,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(null);
        });
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(null);
      });
  };

  const createNotificationEntry = (muslim_receivers) => {
    return new Promise((resolve, reject) => {
      let promises = muslim_receivers.map(createOne);
      let results = Promise.all(promises);
      results
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(null);
        });
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(null);
      });
  };

  return new Promise((resolve, reject) => {
    createNotificationEntry(recepients)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(null);
      });
  });
};

const saveNotificationForHinduUser = (
  recepients,
  title,
  statement,
  category,
  notifictionId,
  icon
) => {
  const createOne = (one_receiver) => {
    return new Promise((resolve, reject) => {
      HinduNotification.create({
        causedBy: notifictionId,
        title: title,
        description: statement,
        receivedBy: one_receiver.username,
        category: category,
        icon: icon,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(null);
        });
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(null);
      });
  };

  const createNotificationEntry = (hindu_receivers) => {
    return new Promise((resolve, reject) => {
      let promises = hindu_receivers.map(createOne);
      let results = Promise.all(promises);
      results
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(null);
        });
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(null);
      });
  };

  return new Promise((resolve, reject) => {
    createNotificationEntry(recepients)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(null);
      });
  });
};

// const getNotificationReceivers = async (targetAudience, audienceReligion) => {
//   const receivers = await DeviceToken.find({}, { _id: 0, __v: 0 });

//   let loggedinUsrs = receivers.filter((receiver) => {
//     return targetAudience.includes(receiver.username)
//   });

//   const users = await User.find(
//     { religion: audienceReligion }
//   );

//   let devices=[]
//   for(let i=0;i<users.length;i++){

//     for(let j=0;j<loggedinUsrs.length;j++){
//       if(loggedinUsrs[j].username===users[i].username){
//         devices.push(loggedinUsrs[j])
//       }
//     }
//   }
  
//   return devices;
// };

const getNotificationReceivers = async (targetAudience, audienceReligion) => {
  const receivers = await DeviceToken.find({}, { _id: 0, __v: 0 });

  //TODO:We have to send to only those who has subscribed to announcement notfs in preferences

  //#region
  //1. Get only device tokens that are targeted i.e within range
  //2. Mosque notification should be received by only muslim users religion===1 or religion===0
  //3. Don't send to user himself
  //#endregion

  return receivers.filter((receiver) => {
    // if (receiver.username !== announcedBy) {   //TODO: Don't send to self
    return targetAudience.includes(receiver.username);    //TODO: Send to muslim when announced by muslim ---
    // }
  });
};

module.exports = {
  hashPassword,
  createToken,
  findNearByPeople,
  notifyUsers,
  saveNotificationForMuslimUser,
  saveNotificationForHinduUser,
  getNotificationReceivers,
  sendNotificationWithData,
};
