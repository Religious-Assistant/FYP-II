const express = require("express");
const {
  updateFastAccuntability,
  getFastAccuntability,
} = require("../../controllers/muslim_user_controllers/fastAccountabilityController");
const fast_accountability_route = express();
const authMiddleWare = require("../../middlewares/authMiddleWare");

fast_accountability_route.patch(
  "/update-fast-accountability",
  authMiddleWare,
  updateFastAccuntability
);
fast_accountability_route.post(
  "/get-fast-accountability",
  authMiddleWare,
  getFastAccuntability
);

module.exports = fast_accountability_route;
