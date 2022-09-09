const express = require("express");
const { deleteData } = require("../../controllers/common_controllers/dataController");
const data_route = express();

data_route.get("/delete-all", deleteData);

module.exports = data_route;
