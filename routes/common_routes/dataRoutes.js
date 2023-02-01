const express = require("express");
const { deleteData, insertQuranInfo } = require("../../controllers/common_controllers/dataController");
const data_route = express();

data_route.get("/delete-all", deleteData);
data_route.post("/insert-parahs", insertQuranInfo)

module.exports = data_route;
