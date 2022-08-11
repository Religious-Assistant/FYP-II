const directoryPath = "public/avatars";
const D7_KEY = "Token c684b50abdbe0aa97f130d657548a85e5ee14593";
const OTP_EXPIRY = "300"; //5 minutes
const TOKEN_EXPIRE = 60 * 60 * 24 * 7; //7 days
const defaultAvatar=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1659965386/religious-assistant/avatar3_l6smjt.png`
const appLogo=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1660083538/religious-assistant/Original_Theme_rmzpoe.png`

const ANNOUNCEMENT_CHANNEL_ID = 1;
const NAMAZ_CHANNEL_ID = 2;
const ADD_NEW_MOSQUE_CHANNEL_ID = 3;


//Categories: Synced with Frotnend
const EID_NAMAZ='EID_NAMAZ'   //Alread received in request
const OTHER='OTHER'           //Alread received in request

const NAMAZ_ALERT='NAMAZ_ALERT' //Not received in request, therefore defined here
const MOSQUE_CONSENSUS='MOSQUE_CONSENSUS' //Not received in request, therefore defined here
const IMAM_CONSENSUS='IMAM_CONSENSUS' //Not received in request, therefore defined here
const NEW_MOSQUE_ADDITION='NEW_MOSQUE_ADDITION' //Not received in request, therefore defined here

module.exports = {
  directoryPath,
  defaultAvatar,
  appLogo,
  D7_KEY,
  OTP_EXPIRY,
  TOKEN_EXPIRE,
  ANNOUNCEMENT_CHANNEL_ID,
  NAMAZ_CHANNEL_ID,
  ADD_NEW_MOSQUE_CHANNEL_ID,

  MOSQUE_CONSENSUS,
  NEW_MOSQUE_ADDITION,
  IMAM_CONSENSUS,
  NAMAZ_ALERT,
};
