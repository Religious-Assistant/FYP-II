const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//Models
const User = require("../../models/common_models/userModel");
const Tasbih = require("../../models/muslim_user_models/tasbihModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");
const MuslimPreference = require("../../models/muslim_user_models/muslimUserPreferencesModel");
const QuranRecitation = require("../../models/muslim_user_models/reciteQuranModel");
const NamazAccountability = require("../../models/muslim_user_models/namazAccountabilityModel");
const FastAccountability = require("../../models/muslim_user_models/fastAccountabilityModel");
const QuranInfo = require("../../models/muslim_user_models/quranInfo");

//common functions
const {
  hashPassword,
  createToken,
} = require("../utils/utils");

const {
  directoryPath,
  defaultAvatar,
  D7_KEY,
  OTP_EXPIRY,
} = require("../utils/constants");
const {
  avatarUploader,
  avatarRemover,
  getPublicId,
  base64Uploader,
} = require("../../utils/cloudinaryUtils");

const registerUser = async (req, res) => {
  console.log("Register API hit");

  try {
    const { username } = await req.body;
    const duplicateUser = await User.findOne({ username: username });
    if (duplicateUser) {
      res.status(200).send({ success: false, msg: "User already exists!" });
    } else {
      // const img_url = base_url + defaultAvatar;

      //By default, Sukkur location is added
      const user_data = await User.create({
        ...req.body,
        location: {
          type: "Point",
          coordinates: [parseFloat("68.8228"), parseFloat("27.7244")],
        },
        avatar: defaultAvatar,
      });

      if (user_data) {
        //Create a Tasbih for each Muslim user, check religion
        if (user_data.religion == 1) {
          await Tasbih.create({ username: username, count: 0 });
          await MuslimPreference.create({ username: username });

          //Create Recitation record for Muslim User
          const quranRecitation = new QuranRecitation({
            username: username,
            recitedSurahs: [
              {
                surahNumber: 0,
                surahName: "NONE",
              },
            ],
            recitedParahs: [
              {
                parahNumber: 0,
                parahName: "NONE",
              },
            ],
            surahLastRead: {
              verseNumber: 0,
              surahNumber: 0,
            },
            parahLastRead: {
              verseNumber: 0,
              surahNumber: 0,
              parahNumber: 0,
            },
          });

          await quranRecitation.save((err, result) => {});
        }

        res.send({ success: true, data: user_data });
        return;
      }
      res.send({ success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loginUser = async (req, res) => {
  console.log("Login API hit", req.body.password, req.body.username);
  try {
    const { username, password, deviceToken } = req.body;

    const user_data = await User.findOne({
      username: username,
      verified: true,
    });

    if (user_data) {
      const passwordMatch = await bcrypt.compare(password, user_data.password);

      if (passwordMatch) {
        const token = await createToken(user_data.username);

        let userPreferences;
        if (user_data.religion == 1) {
          userPreferences = await MuslimPreference.findOne({
            username: username,
          });
        }
        // else{//Hindu Prefs
        //   userPreferences = await MuslimPreference.findOne({username:username})
        // }

        const resultData = {
          ...user_data._doc,
          token: token,
          preferences: userPreferences,
        };
        await DeviceToken.findOneAndUpdate(
          { username: username },
          { username, deviceToken },
          { upsert: true }
        );
        res.send({
          success: true,
          data: resultData,
          msg: "Logged in Successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          msg: "Invalid user details provided! Or unverified account",
        });
      }
    } else {
      res.status(200).send({
        success: false,
        msg: "Invalid user details provided! Or unverified account",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUpdatedUserdata = async (req, res) => {
  console.log("Get Updated User Data hit", req.body);
  try {
    const { username } = req.body;

    const user_data = await User.findOne({
      username: username,
    });

    if (user_data) {

        res.send({
          success: true,
          data: user_data,
          msg: "Fetched Data Successfully",
        });
      } else {
        res.status(400).send({
          success: false,
          msg: "Could not fetch data ",
        });
      }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  console.log("Forgot password API hit");
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const securePassword = await hashPassword(newPassword);
      await User.updateOne(
        { username: username },
        { $set: { password: securePassword } }
      );

      res.status(200).send({
        success: true,
        msg: "Password Updated Successfully!",
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  console.log("Update Profile API hit");
 try {
    const { username, profileImage } = req.body;

    let image=`data:image/png;base64,${profileImage}`

    const user = await User.findOne({ username });
    if (user) {
      const avatar = user.avatar;
      if (avatar !== defaultAvatar) {
        let p_id = getPublicId(avatar);
        avatarRemover(p_id)
          .then(async (result) => {
            if (result) {
              await base64Uploader(image)
                .then(async (result) => {
                  const updated = await User.findOneAndUpdate(
                    { username: username },
                    { avatar: result.url },
                    {new:true}
                  );

                  return res
                    .status(200)
                    .send({
                      success: true,
                      msg: "Updated Image successfully",
                      data: updated,
                    });
                })
                .catch((error) => {
                  return res.status(400).send({
                    success: false,
                    msg: "Could not upload image",
                    error: error.message,
                  });
                });
            } else {
              return res.status(400).send({
                success: false,
                msg: "Failed to overwrite existing image",
              });
            }
          })
          .catch((error) => {
            return res.status(400).send({
              success: false,
              msg: "Failed to overwrite existing image",
            });
          });
      } else {
        await base64Uploader(image)
          .then(async (result) => {

            const updated = await User.findOneAndUpdate(
              { username: username },
              { avatar: result.url }
            );

            return res
              .status(200)
              .send({
                success: true,
                msg: "Updated Image successfully",
                data: updated,
              });
          })
          .catch((error) => {
            return res.status(400).send({
              success: false,
              msg: "Could not upload image",
              error: error.message,
            });
          });
      }
    } else {
      return res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendOTPCode = async (req, res) => {
  console.log("GET OTP Hit");
  try {
    const { username, mobile } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      fetch("https://d7networks.com/api/verifier/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: D7_KEY,
        },
        body: `
        {
            "expiry":${OTP_EXPIRY},
            "message":"Dear ${username} your OTP code is {code}. Valid for 5 minutes",
            "mobile":${mobile},
            "sender_id":"R-Assistant"}
        `,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          res.send({ success: true, msg: "OTP sent", data: response });
        })
        .catch((error) => {
          res.send({ success: false, msg: "Could not sent OTP" });
        });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verifyOTPCode = async (req, res) => {
  console.log("Verify OTP API Hit");
  try {
    const { otpId, otpCode } = req.body;
    fetch("https://d7networks.com/api/verifier/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: D7_KEY,
      },
      body: `
        {
            "otp_id":${otpId},
            "otp_code":${otpCode}
        `,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        res.send({ success: true, msg: "OTP Verified", data: response });
      })
      .catch((error) => {
        res.send({ success: false, msg: "Could not verify OTP" });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePassword = async (req, res) => {
  console.log("Update password API hit");
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const securePassword = await hashPassword(newPassword);
      const result=await User.updateOne(
        { username: username },
        { $set: { password: securePassword } }
      );

      if(result.acknowledged){
        res.status(200).send({
          success: true,
          msg: "Password Updated Successfully!",
        });
      }
      else{
        res.status(200).send({
          success: false,
          msg: "Could not update password",
        });
      }

    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateLocation = async (req, res) => {
  console.log("Update Location API hit", req.body);
  try {

    const { username, longitude, latitude } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      if (latitude && longitude) {
        const data = await User.findOneAndUpdate(
          { username: username },
          {
            $set: {
              location: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
              },
            },
          },
          {
            new: true,
          }
        );

        res.send({
          success: true,
          msg: "Location Updated Successfully",
          data: data,
        });
      } else {
        res.send({ success: false, msg: "Location required" });
      }
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  console.log("Delete User API hit");
  try {
    const { username } = req.body;

    await User.findOneAndDelete({ username });
    await Tasbih.findOneAndDelete({ username });
    await QuranRecitation.findOneAndDelete({ username });
    await DeviceToken.findOneAndDelete({ username });
    await MuslimPreference.findOneAndDelete({ username });

    // await .findOneAndDelete({ username }); Hindu Prefs

    res.status(200).send({
      success: true,
      msg: "User Deleted Successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertQuranInfo = async () => {
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
};

module.exports = {
  registerUser,
  loginUser,
  getUpdatedUserdata,
  forgotPassword,
  updateProfileImage,
  sendOTPCode,
  verifyOTPCode,
  updatePassword,
  deleteUser,
  updateLocation,
};
