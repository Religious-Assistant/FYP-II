const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//Models
const User = require("../models/userModel");
const Tasbih = require("../models/tasbihModel");
const DeviceToken = require("../models/deviceTokenModel");
const MuslimPreference = require("../models/muslimUserPreferencesModel");
const QuranRecitation = require("../models/reciteQuranModel");

//common functions
const { hashPassword, createToken } = require("./common");

const {
  directoryPath,
  base_url,
  defaultAvatar,
  D7_KEY,
  OTP_EXPIRY,
} = require("./constants");

const registerUser = async (req, res) => {
  console.log("Register API hit", req.body.password, req.body.username);

  try {
    const { username } = await req.body;
    const duplicateUser = await User.findOne({ username: username });
    if (duplicateUser) {
      res.status(200).send({ success: false, msg: "User already exists!" });
    } else {
      const img_url = base_url + defaultAvatar;
      const user_data = await User.create({ ...req.body });

      if (user_data) {
        //Create a Tasbih for each Muslim user, check religion
        if (user_data.religion == 1) {
          await Tasbih.create({ username: username, count: 0 });
          await MuslimPreference.create({ username: username });
          
          //Create Recitation record for Muslim User
          const quranRecitation = new QuranRecitation({
            username: username,
            recitedSurahs: [
              {
                surahNumber: 0,
                surahName: "NONE",
              },
            ],
            recitedParahs: [
              {
                parahNumber: 0,
                parahName: "NONE",
              },
            ],
            surahLastRead: {
              verseNumber: 0,
              surahNumber: 0,
            },
            parahLastRead: {
              verseNumber: 0,
              surahNumber: 0,
              parahNumber: 0,
            },
          });

          await quranRecitation.save((err, result) => {
            console.log(result ? result : err);
          });
        }

        res.send({ success: true, data: user_data, avatar: img_url });
        return;
      }
      res.send({ success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loginUser = async (req, res) => {
  console.log("Login API hit", req.body.password, req.body.username);
  try {
    const { username, password, deviceToken } = req.body;

    const user_data = await User.findOne({
      username: username,
      verified: true,
    });

    if (user_data) {
      const passwordMatch = await bcrypt.compare(password, user_data.password);

      if (passwordMatch) {
        const token = await createToken(user_data.username);

        let userPreferences;
        if (user_data.religion == 1) {
          userPreferences = await MuslimPreference.findOne({
            username: username,
          });
        }
        // else{//Hindu Prefs
        //   userPreferences = await MuslimPreference.findOne({username:username})
        // }

        if (user_data.avatar == defaultAvatar) {
          const resultData = {
            ...user_data._doc,
            token: token,
            avatar: base_url + defaultAvatar,
            preferences: userPreferences,
          };
          await DeviceToken.findOneAndUpdate(
            { username: username },
            { username, deviceToken },
            { upsert: true }
          );
          res.send({
            success: true,
            data: resultData,
            msg: "Logged in Successfully",
          });
        } else {
          getProfileImage(user_data.username)
            .then((avatar) => {
              const resultData = {
                ...user_data._doc,
                token: token,
                avatar: avatar,
              };
              res.send({ success: true, data: resultData });
            })
            .catch((error) => {
              res
                .status(200)
                .send({ success: false, msg: "Could not load image" });
            });
        }
      } else {
        res
          .status(200)
          .send({
            success: false,
            msg: "Invalid user details provided! Or unverified account",
          });
      }
    } else {
      res
        .status(200)
        .send({ success: false, msg: "Invalid user details provided!" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  console.log("Forgot password API hit");
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const securePassword = await hashPassword(newPassword);
      await User.updateOne(
        { username: username },
        { $set: { password: securePassword } }
      );

      res.status(200).send({
        success: true,
        msg: "Password Updated Successfully!",
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  console.log("Update Profile API hit");
  try {
    const image = req.files.avatar;
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const imageName = username + "-" + new Date().getTime() + ".png";
      image.mv(path.join(directoryPath, imageName), async (error) => {
        if (!error) {
          await User.updateOne(
            { username: username },
            { $set: { avatar: image.name } }
          );

          res.send({
            success: true,
            msg: "Updated profile image successfully",
          });
        } else {
          console.log(error);
          res.send({ success: false, msg: "Failed to upload image" });
        }
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendOTPCode = async (req, res) => {
  console.log("GET OTP Hit");
  try {
    const { username, mobile } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      fetch("https://d7networks.com/api/verifier/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: D7_KEY,
        },
        body: `
        {
            "expiry":${OTP_EXPIRY},
            "message":"Dear ${username} your OTP code is {code}. Valid for 5 minutes",
            "mobile":${mobile},
            "sender_id":"R-Assistant"}
        `,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          res.send({ success: true, msg: "OTP sent", data: response });
        })
        .catch((error) => {
          res.send({ success: false, msg: "Could not sent OTP" });
        });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verifyOTPCode = async (req, res) => {
  console.log("Verify OTP API Hit");
  try {
    const { otpId, otpCode } = req.body;
    fetch("https://d7networks.com/api/verifier/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: D7_KEY,
      },
      body: `
        {
            "otp_id":${otpId},
            "otp_code":${otpCode}
        `,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        res.send({ success: true, msg: "OTP Verified", data: response });
      })
      .catch((error) => {
        res.send({ success: false, msg: "Could not verify OTP" });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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

const updatePassword = async (req, res) => {
  console.log("Update password API hit");
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const securePassword = await hashPassword(newPassword);
      await User.updateOne(
        { username: username },
        { $set: { password: securePassword } }
      );

      res.status(200).send({
        success: true,
        msg: "Password Updated Successfully!",
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  console.log("Delete User API hit");
  try {
    const { username } = req.body;

    await User.findOneAndDelete({ username });
    await Tasbih.findOneAndDelete({ username });
    await QuranRecitation.findOneAndDelete({ username });
    await DeviceToken.findOneAndDelete({ username });
    await MuslimPreference.findOneAndDelete({ username });
    // await .findOneAndDelete({ username }); Hindu Prefs

    res.status(200).send({
      success: true,
      msg: "User Deleted Successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updateProfileImage,
  sendOTPCode,
  verifyOTPCode,
  updatePassword,
  deleteUser,
};
