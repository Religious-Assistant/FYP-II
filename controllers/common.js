
const jwt_secret = process.env.JWT_KEY;
const {
    TOKEN_EXPIRE,
  } = require("./constants");


async function hashPassword(password) {
    const newPass = await bcrypt.hash(password, 5);
    return newPass;
}

//Must get username and device token
async function createToken(id) {
    return jwt.sign({ _id: id }, jwt_secret,{expiresIn:TOKEN_EXPIRE});
}
  
module.exports={
    hashPassword,
    createToken
}