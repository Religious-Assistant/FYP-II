const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    res.status(200).send({ success: false, msg: "A token is required." });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwt_secret);
    req.user = decodedToken;
  } catch (error) {
    res.status(400).send({ msg: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
