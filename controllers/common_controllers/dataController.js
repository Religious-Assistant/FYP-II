const User=require('../../models/common_models/userModel')
const A=require('../../models/muslim_user_models/fastAccountabilityModel')
const B=require('../../models/muslim_user_models/imamModel')
const C=require('../../models/muslim_user_models/learnNamazModel')
const D=require('../../models/muslim_user_models/mosqueModel')
const E=require('../../models/muslim_user_models/mosqueNamazTimesModel')
const F=require('../../models/muslim_user_models/muslimAnnouncementModel')
const G=require('../../models/muslim_user_models/muslimUserNotificationModel')
const H=require('../../models/muslim_user_models/muslimUserPreferencesModel')
const I=require('../../models/muslim_user_models/namazAccountabilityModel')
const J=require('../../models/muslim_user_models/namazAlarmsModel')
const K=require('../../models/muslim_user_models/namazInfoModel')

const L=require('../../models/hindu_user_models/hinduAnnouncementModel')
const M=require('../../models/hindu_user_models/hinduUserNotificationModel')
const N=require('../../models/hindu_user_models/hinduUserPreferencesModel')
const O=require('../../models/hindu_user_models/reciteGitaModel')
const P=require('../../models/hindu_user_models/templeModel')
const Q=require('../../models/hindu_user_models/vegNonVegModel')


const deleteData = async (req, res) => {
  try {

    await User.deleteMany({})
    await A.deleteMany({})
    await B.deleteMany({})
    await C.deleteMany({})
    await D.deleteMany({})
    await E.deleteMany({})
    await F.deleteMany({})
    await G.deleteMany({})
    await H.deleteMany({})
    await I.deleteMany({})
    await J.deleteMany({})
    await K.deleteMany({})
    await L.deleteMany({})
    await M.deleteMany({})
    await N.deleteMany({})
    await O.deleteMany({})
    await P.deleteMany({})
    await Q.deleteMany({})

    res.status(200).send({ success: true, msg: ``, data: [] });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports={
    deleteData
}