const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path=require('path')

const { directoryPath, base_url, defaultAvatar } = require("./constants");
const bcrypt = require("bcrypt");

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
    const user_data = await User.findOne({ username: username });

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
    console.log(username);

    const user = await User.findOne({ username });
    if (user) {
      const newPassword = await encryptPassword(password);
      const updatedData = await User.updateOne(
        { username: username },
        { $set: { password: newPassword } }
      );
      res.status(200).send({
        success: true,
        msg: "Password Updated Successfully!",
        data: updatedData,
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
        const imageName=username+'-'+(new Date().getTime())+".png"
      image.mv(path.join(directoryPath,imageName),async (error) => {
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
            console.log(error)
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

async function encryptPassword(password) {
  return await bcryptjs.hash(password, 5);
}

async function createToken(id) {
  return jwt.sign({ _id: id }, jwt_secret);
}

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  updateProfileImage,
};
