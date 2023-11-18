const LearnNamaz = require("../../models/muslim_user_models/learnNamazModel");

const updateProgress = async (req, res) => {
  try {
    const { username, namaz } = req.body;
    const user = await LearnNamaz.findOne({ username });

    const level = await getLevel(user.score + 10);

    let updatedProgress;
    if (
      namaz.namazName.toLowerCase() == "fajr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "fajr.hasLearned2Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "fajr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 2
    ) {
      console.log(level);
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "fajr.hasLearned2Farz": true },
        },
        { new: true }
      );
    }

    //#region
    if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "zuhr.hasLearned4Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "zuhr.hasLearned4Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "zuhr.hasLearned4Farz": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "zuhr.hasLearned2Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "nafl" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "zuhr.hasLearned2Nafl": true },
        },
        { new: true }
      );
    }

    // ASR
    if (
      namaz.namazName.toLowerCase() == "asr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "asr.hasLearned4Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "asr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "asr.hasLearned4Farz": true },
        },
        { new: true }
      );
    }

    //MAGHRIB
    if (
      namaz.namazName.toLowerCase() == "maghrib" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "maghrib.hasLearned2Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "maghrib" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 3
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "maghrib.hasLearned3Farz": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "maghrib" &&
      namaz.rakatName.toLowerCase() == "nafl" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "maghrib.hasLearned2Nafl": true },
        },
        { new: true }
      );
    }

    // ISHA
    if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "nafl" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "isha.hasLearned2Nafl": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "isha.hasLearned4Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "isha.hasLearned4Farz": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "isha.hasLearned2Sunnah": true },
        },
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "witr" &&
      namaz.rakats == 3
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $inc: { score: 10 },
          $set: { level: level, "isha.hasLearned3Vitr": true },
        },
        { new: true }
      );
    }

    //#endregion

    if (updatedProgress) {
      res.status(200).send({
        success: true,
        msg: `Updated Successfully`,
        data: updatedProgress,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: `Could not update progress` });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not update Namaz Progress" });
  }
};

const getLevel = async (score) => {
  if (score < 20) {
    return 1;
  } else if (score >= 20 && score < 60) {
    return 2;
  } else if (score >= 60 && score < 80) {
    return 3;
  } else if (score >= 80 && score < 110) {
    return 4;
  } else if (score >= 110) {
    return 5;
  }
};
//Take username and return whole information about user performance
const getProgress = async (req, res) => {
  try {
    const { username } = req.body;

    const progress = await LearnNamaz.findOne({ username });

    if (progress) {
      res.status(200).send({
        success: true,
        msg: "Fetched progress successfully",
        data: progress,
      });
    } else {
      res
        .status(200)
        .send({ success: false, msg: "Could not fetch Namaz Progress" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not get Progress" });
  }
};

//Take username and return whole information about user performance
const getParticularRakatInfo = async (req, res) => {
  console.log("GET particular Rakat Info");
  try {
    let { username, namazName, rakats, rakatName } = req.body;

    namazName = namazName.toLowerCase();
    rakatName = rakatName.toLowerCase();

    console.log(namazName, rakatName, rakats);
    let d = await LearnNamaz.findOne({ username });

    if (namazName == "fajr" && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.fajr.hasLearned2Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "fajr" && rakatName == "farz") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.fajr.hasLearned2Farz,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "duhr" && rakats == 4 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.zuhr.hasLearned4Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "duhr" && rakats == 2 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.zuhr.hasLearned2Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "duhr" && rakats == 4 && rakatName == "farz") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.zuhr.hasLearned4Farz,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "duhr" && rakats == 2 && rakatName == "nafl") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.zuhr.hasLearned2Nafl,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "asr" && rakats == 4 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.asr.hasLearned4Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "asr" && rakats == 4 && rakatName == "farz") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.asr.hasLearned4Farz,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "maghrib" && rakats == 3 && rakatName == "farz") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.maghrib.hasLearned3Farz,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "maghrib" && rakats == 2 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.maghrib.hasLearned2Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "maghrib" && rakats == 2 && rakatName == "nafl") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.maghrib.hasLearned2Nafl,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "isha" && rakats == 4 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.isha.hasLearned4Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "isha" && rakats == 4 && rakatName == "farz") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.isha.hasLearned4Farz,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "isha" && rakats == 2 && rakatName == "sunnat") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.isha.hasLearned2Sunnah,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "isha" && rakats == 2 && rakatName == "nafl") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.isha.hasLearned2Nafl,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    } else if (namazName == "isha" && rakats == 3 && rakatName == "witr") {
      if (d) {
        return res.status(200).send({
          success: true,
          msg: "Did not found",
          data: d.isha.hasLearned3Vitr,
        });
      } else {
        return res.status(200).send({ success: true, msg: "Did not found" });
      }
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not get Progress" });
  }
};

module.exports = {
  updateProgress,
  getProgress,
  getParticularRakatInfo,
};
