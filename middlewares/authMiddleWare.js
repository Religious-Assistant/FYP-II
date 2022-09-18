const jwt = require("jsonwebtoken");
const jwt_secret=process.env.JWT_KEY;


const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(200).send({ success: false, msg: "A token is required." });
  }

  try {
    const decodedToken = jwt.verify(token, jwt_secret);
    req.user = decodedToken;
  } catch (error) {
    return res.status(400).send({ msg: "Invalid Token" });
  }

  return next();
};

module.exports = verifyToken;
