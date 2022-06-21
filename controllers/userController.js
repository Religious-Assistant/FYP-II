const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const User = require("../models/userModel");
const Tasbih = require("../models/tasbihModel");

const {
  directoryPath,
  base_url,
  defaultAvatar,
  D7_KEY,
  OTP_EXPIRY,
} = require("./constants");

const jwt_secret = process.env.JWT_KEY;

const registerUser = async (req, res) => {
  console.log("Register API hit");

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
        if(user_data.religion==1){
          await Tasbih.create({username:username, count:0})
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
  
  console.log("Login API hit");
  try {
    const { username, password } = req.body;
    const user_data = await User.findOne({ username: username, verified:true });

    if (user_data) {
      const passwordMatch = await bcrypt.compare(password, user_data.password);

      if (passwordMatch) {
        const token = await createToken(user_data.username);
        if (user_data.avatar == defaultAvatar) {
          const resultData = {
            ...user_data._doc,
            token: token,
            avatar: base_url + defaultAvatar,
          };
          res.send({ success: true, data: resultData });
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
          .send({ success: false, msg: "Invalid user details provided!" });
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

const updatePassword = async (req, res) => {
  console.log("Update password API hit");
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const securePassword = await hashPassword(password);
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

const updateLocation = async (req, res) => {
  console.log("Update Location API hit");
  try {
    const { username, longitude, latitude } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      if (latitude && longitude) {
        await User.updateOne(
          { username: username },
          {
            $set: {
              location: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
              },
            },
          }
        );
        res.send({ success: true, msg: "Location Updated" });
      } else {
        res.send({ success: false, msg: "Location required" });
      }
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

const logout=async(req, res)=>{
  
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

async function createToken(id) {
  return jwt.sign({ _id: id }, jwt_secret);
}
async function hashPassword(password) {
  const newPass = await bcrypt.hash(password, 5);
  return newPass;
}

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  updateProfileImage,
  sendOTPCode,
  verifyOTPCode,
  updateLocation,
  logout
};
