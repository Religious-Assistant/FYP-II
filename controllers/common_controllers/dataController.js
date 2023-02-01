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
const R=require('../../models/muslim_user_models/tasbihModel')

const L=require('../../models/hindu_user_models/hinduAnnouncementModel')
const M=require('../../models/hindu_user_models/hinduUserNotificationModel')
const N=require('../../models/hindu_user_models/hinduUserPreferencesModel')
const O=require('../../models/hindu_user_models/reciteGitaModel')
const P=require('../../models/hindu_user_models/templeModel')
const Q=require('../../models/hindu_user_models/vegNonVegModel')
const QuranInfo = require("../../models/muslim_user_models/quranInfo");

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
    await R.deleteMany({})

    res.status(200).send({ success: true, msg: ``, data: [] });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertQuranInfo = async (req, res) => {
  const quranInfo = new QuranInfo({
    parahs: [
      {
        number: 1,
        name: "آلم",
        englishName: "Alif laam meem",
      },
      {
        number: 2,
        name: "سَيَقُولُ",
        englishName: "Sayaqulu",
      },
      {
        number: 3,
        name: "تِلْكَ الرُّسُلُ",
        englishName: "Tilka r Rusulu",
      },
      {
        number: 4,
        name: "لَنْ تَنَالُوا",
        englishName: "Lan Tana Loo",
      },
      {
        number: 5,
        name: "وَالْمُحْصَنَاتُ",
        englishName: "Wal Mohsanat",
      },
      {
        number: 6,
        name: "يُحِبُّ لَااللَّهُ",
        englishName: "La Yahubbullah",
      },
      {
        number: 7,
        name: "وَإِذَا سَمِعُوا",
        englishName: "Wa Iza Samiu",
      },
      {
        number: 8,
        name: " وَلَوْ أَنَّنَا",
        englishName: "Wa Lau Annana",
      },
      {
        number: 9,
        name: "قَالَ الْمَلَأُ",
        englishName: "Qalal Malao",
      },
      {
        number: 10,
        name: "وَاعْلَمُوا",
        englishName: "Wa A’lamu",
      },
      {
        number: 11,
        name: "يَعْتَذِرُونَ",
        englishName: "Yatazeroon",
      },
      {
        number: 12,
        name: "وَمَا مِنْ دَابَّةٍ",
        englishName: "Wa Mamin Da’abat",
      },
      {
        number: 13,
        name: "بَرِّئُوَمَا",
        englishName: "Wa Ma Ubiroo",
      },
      {
        number: 14,
        name: "رُبَمَا",
        englishName: "Rubama",
      },
      {
        number: 15,
        name: "سُبْحَانَ الَّذِي",
        englishName: "Subhanallahzi",
      },
      {
        number: 16,
        name: "قَالَ أَلَمْ ",
        englishName: "Qal Alam",
      },
      {
        number: 17,
        name: "اقْتَرَبَ",
        englishName: "Aqtarabo",
      },
      {
        number: 18,
        name: "قَدْ أَفْلَحَ",
        englishName: "Qadd Aflaha",
      },
      {
        number: 19,
        name: "وَقَالَ الَّذِينَ",
        englishName: "Wa Qalallazina",
      },
      {
        number: 20,
        name: "أَمَّنْ خَلَقَ",
        englishName: "A’man Khalaq",
      },
      {
        number: 21,
        name: "اتْلُ مَا أُوحِيَ",
        englishName: "Utlu Ma Oohi",
      },
      {
        number: 22,
        name: "وَمَنْ يَقْنُتْ ",
        englishName: "Wa Manyaqnut",
      },
      {
        number: 23,
        name: "وَمَا لِيَ",
        englishName: "Wa Mali",
      },
      {
        number: 24,
        name: "فَمَنْ أَظْلَمُ",
        englishName: "Faman Azlam",
      },
      {
        number: 25,
        name: "إِلَيْهِ يُرَدُّ",
        englishName: "Elahe Yuruddo",
      },
      {
        number: 26,
        name: "حم",
        englishName: "Ha’a Meem",
      },
      {
        number: 27,
        name: "قَال فَمَا خَطْبُكُمْ",
        englishName: "Qala Fama Khatbukum",
      },
      {
        number: 28,
        name: "قَدْ سَمِعَ اللَّهُ",
        englishName: "Qadd Sami Allah",
      },
      {
        number: 29,
        name: "تَبَارَكَ الَّذِي",
        englishName: "Tabarakallazi",
      },
      {
        number: 30,
        name: "عَمَّ يَتَسَاءَلُونَ",
        englishName: "Amma Yatasa’aloon",
      },
    ],
  });
  await quranInfo.save();
  res.send({data:"inserted successfully"})
};

module.exports={
    deleteData,
    insertQuranInfo
}