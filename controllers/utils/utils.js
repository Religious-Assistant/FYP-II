const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const fs=require('fs')
const User = require("../../models/common_models/userModel");
const MuslimNotification = require("../../models/muslim_user_models/muslimUserNotificationModel");
const HinduNotification = require("../../models/hindu_user_models/hinduUserNotificationModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");

const jwt_secret = process.env.JWT_KEY;
const { TOKEN_EXPIRE, directoryPath, base_url } = require("./constants");

async function hashPassword(password) {
  const newPass = await bcrypt.hash(password, 5);
  return newPass;
}

//Must get username and device token
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
        maxDistance: 1000 * 50, //Get users in 50KM
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

async function notifyUsers(title, body, targetDevices, channelId, senderImage) {
  
  // Send a message to devices with the registered tokens

  const resp=await admin
    .messaging()
    .sendMulticast({
      tokens: targetDevices.map(token=>token.deviceToken),
      data: {
        notification: JSON.stringify({
          body: body,
          title: title,
          channelId:channelId+"",
          largeIcon:senderImage
        }),
      },
    })

    return resp.successCount
}


const saveNotificationForMuslimUser=(recepients,title,statement,category)=>{

  const createOne = (one_receiver) => {
    return new Promise((resolve, reject) => {
      MuslimNotification.create({
        title: title,
        description: statement,
        receivedBy: one_receiver.username,
        category: category,
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

}


const saveNotificationForHinduUser=(recepients,title,statement,category)=>{

  const createOne = (one_receiver) => {
    return new Promise((resolve, reject) => {
      HinduNotification.create({
        title: title,
        description: statement,
        receivedBy: one_receiver.username,
        category: category,
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

}

const getNotificationReceivers=async (targetAudience, audienceReligion)=>{
  const receivers = await DeviceToken.find({}, { _id: 0, __v: 0 }); 

    //We could send to only those who has subscribed to announcement notfs in preferences

    //#region
    //1. Get only device tokens that are targeted i.e within range
    //2. Mosque notification should be received by only muslim users religion===1 or religion===0
    //3. Don't send to user himself

    //#endregion

  return receivers.filter((receiver) => {
    // if (receiver.username !== announcedBy) {
    return targetAudience.includes(receiver.username);
    // }
  });

  
}


// const getProfileImage = async (username) => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(directoryPath, function (err, files) {
//       if (err) {
//         reject(err);
//       }
//       files.forEach(function (file) {
//         const splittedName = file.split("-");
//         if (splittedName[0] == username) {
//           resolve(base_url + file);
//         }
//       });
//       reject("Image Not found");
//     });
//   });
// };

module.exports = {
  hashPassword,
  createToken,
  findNearByPeople,
  notifyUsers,
  saveNotificationForMuslimUser,
  saveNotificationForHinduUser,
  getNotificationReceivers
  // getProfileImage
};
