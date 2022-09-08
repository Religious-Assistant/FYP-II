const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  updateProfileImage,
  sendOTPCode,
  verifyOTPCode,
  updatePassword,
  deleteUser,
  updateLocation,
  getUpdatedUserdata,
  deleteDeviceToken,
} = require("../../controllers/common_controllers/userController");

const user_route = express();
const authMiddleWare = require("../../middlewares/authMiddleWare");

user_route.post("/register-user", registerUser);
user_route.post("/login-user", loginUser);
user_route.post("/get-updated-user-data", getUpdatedUserdata);

user_route.patch("/update-password", authMiddleWare, updatePassword);
user_route.patch("/forgot-password", forgotPassword);
user_route.patch("/update-profile-image", authMiddleWare, updateProfileImage);
user_route.post("/get-OTP-code", sendOTPCode);
user_route.post("/verify-otp-code", verifyOTPCode);
user_route.patch("/update-location", authMiddleWare, updateLocation);
user_route.delete("/delete-device-token", authMiddleWare, deleteDeviceToken);



//For development
user_route.get("/delete-user", deleteUser);
module.exports = user_route;
