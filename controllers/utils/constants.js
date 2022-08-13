const directoryPath = "public/avatars";
const OTP_EXPIRY = "1500"; //5 minutes
const TOKEN_EXPIRE = 60 * 60 * 24 * 7; //7 days
const defaultAvatar=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1659965386/religious-assistant/avatar3_l6smjt.png`
const appLogo=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1660083538/religious-assistant/Original_Theme_rmzpoe.png`

//For notifications
const imam_notification_logo=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1660431517/religious-assistant/applyAsImam_ic_kntljj.png`
const announcement_notification_logo=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1660431540/religious-assistant/announcement1_ic_m8j0kg.png`
const new_mosque_notification_logo=`https://res.cloudinary.com/nadirhussainnn/image/upload/v1660431552/religious-assistant/mosque1_ic_yw4vz4.png`
const namaz_alert_notification_logo='https://res.cloudinary.com/nadirhussainnn/image/upload/v1660431651/religious-assistant/clock_ic_vhxtzg.png'
const consensus_notificaion_logo='https://res.cloudinary.com/nadirhussainnn/image/upload/v1660431723/religious-assistant/vote_ic_puas0i.png'
const rejected_notification_logo='https://res.cloudinary.com/nadirhussainnn/image/upload/v1660432110/religious-assistant/rejected_ic_qo4bf4.png'

const ANNOUNCEMENT_CHANNEL_ID = 1;
const NAMAZ_CHANNEL_ID = 2;
const ADD_NEW_MOSQUE_CHANNEL_ID = 3;
const ADD_IMAM_CHANNEL_ID = 4;


//Categories: Synced with Frotnend
const EID_NAMAZ='EID_NAMAZ'   //Alread received in request
const OTHER='OTHER'           //Alread received in request

const NAMAZ_ALERT='NAMAZ_ALERT' //Not received in request, therefore defined here
const MOSQUE_CONSENSUS='MOSQUE_CONSENSUS' //Not received in request, therefore defined here
const IMAM_CONSENSUS='IMAM_CONSENSUS' //Not received in request, therefore defined here
const NEW_MOSQUE_ADDITION='NEW_MOSQUE_ADDITION' //Not received in request, therefore defined here
const IMAM_VERIFIED='IMAM_VERIFIED' //Not received in request, therefore defined here
const IMAM_UNVERIFIED='IMAM_UNVERIFIED' //Not received in request, therefore defined here
const NEW_MOSQUE_UNVERIFIED='NEW_MOSQUE_UNVERIFIED' //Not received in request, therefore defined here

module.exports = {
  directoryPath,
  defaultAvatar,
  appLogo,
  OTP_EXPIRY,
  TOKEN_EXPIRE,
  ANNOUNCEMENT_CHANNEL_ID,
  NAMAZ_CHANNEL_ID,
  ADD_NEW_MOSQUE_CHANNEL_ID,
  MOSQUE_CONSENSUS,
  NEW_MOSQUE_ADDITION,
  IMAM_CONSENSUS,
  IMAM_VERIFIED,
  IMAM_UNVERIFIED,
  NAMAZ_ALERT,
  NEW_MOSQUE_UNVERIFIED,
  ADD_IMAM_CHANNEL_ID,
  new_mosque_notification_logo,
  announcement_notification_logo,
  consensus_notificaion_logo,
  imam_notification_logo,
  namaz_alert_notification_logo,
  rejected_notification_logo


};
