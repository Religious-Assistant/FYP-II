const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const fs=require('fs')
const User = require("../../models/common_models/userModel");

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

async function notifyUsers(title, body, targetDevices) {
  
  // Send a message to devices with the registered tokens

  const resp=await admin
    .messaging()
    .sendMulticast({
      tokens: targetDevices.map(token=>token.deviceToken),
      data: {
        notification: JSON.stringify({
          body: body,
          title: title,
            // android: {
            //   channelId: "default",
            //   smallIcon: "ic_launcher",
            //   actions: [
            //     {
            //       title: "Mark as Read",
            //       pressAction: {
            //         id: "read",
            //       },
            //     },
            //   ],
            // },
        }),
      },
    })

    return resp.successCount
}

const getProfileImage = async (username) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        reject(err);
      }
      files.forEach(function (file) {
        const splittedName = file.split("-");
        if (splittedName[0] == username) {
          resolve(base_url + file);
        }
      });
      reject("Image Not found");
    });
  });
};

module.exports = {
  hashPassword,
  createToken,
  findNearByPeople,
  notifyUsers,
  getProfileImage
};
