const LearnNamaz = require("../../models/muslim_user_models/learnNamazModel");

const updateProgress = async (req, res) => {
  try {
    const { username, namaz } = req.body;

    console.log(namaz);

    let updatedProgress;
    if (
      namaz.namazName.toLowerCase() == "fajr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        { fajr:{$set: { hasLearned2Sunnah: true }}},
        { new: true }
      );
    } else if (
      namaz.namazName.toLowerCase() == "fajr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {fajr:{$set: { hasLearned2Farz: true }}},
        { new: true }
      );
      console.log(updatedProgress);
    }

    if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{zuhr: { hasLearned2Farz: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{zuhr: { hasLearned4Sunnah: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{zuhr: { hasLearned4Farz: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{zuhr: { hasLearned2Sunnah: true} }
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "duhr" &&
      namaz.rakatName.toLowerCase() == "nafl" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{zuhr: { hasLearned2Nafl: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
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
          $set:{asr: { hasLearned4Sunnah: true} }
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "asr" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{asr: { hasLearned4Farz: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
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
          $set:{maghrib: { hasLearned2Sunnah: true} }
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "maghrib" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 3
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{maghrib: { hasLearned3Farz: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "maghrib" &&
      namaz.rakatName.toLowerCase() == "nafl" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{maghrib: { hasLearned2Nafl: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
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
          $set:{isha: { hasLearned2Nafl: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{isha: { hasLearned4Sunnah: true} }
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "farz" &&
      namaz.rakats == 4
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{isha: { hasLearned4Farz: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "sunnat" &&
      namaz.rakats == 2
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{isha: { hasLearned2Sunnah: true} }
        },
        { new: true }
      );
      console.log(updatedProgress);
    } else if (
      namaz.namazName.toLowerCase() == "isha" &&
      namaz.rakatName.toLowerCase() == "vitr" &&
      namaz.rakats == 3
    ) {
      updatedProgress = await LearnNamaz.findOneAndUpdate(
        { username: username },
        {
          $set:{isha: { hasLearned3Vitr: true }}
        },
        { new: true }
      );
      console.log(updatedProgress);
    }

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

module.exports = {
  updateProgress,
  getProgress,
};
