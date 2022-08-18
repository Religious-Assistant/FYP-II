const GitaRecitation = require("../../models/hindu_user_models/reciteGitaModel");
const User = require("../../models/common_models/userModel");

const markChapterAsRead = async (req, res) => {

  console.log("Mark Chapter as Read API hit");
  try {
    const { username, chapterNumber, chapterName } = req.body;
    const user_data = await User.findOne({ username: username });
    if (user_data) {
      const chapterAfterMarkAsRead = await GitaRecitation.findOneAndUpdate(
        {
          username: username,
          "recitedChapters.chapterName": { $ne: chapterName },
        },
        {
          $addToSet: {
            recitedChapters: {
              chapterName: chapterName,
              chapterNumber: chapterNumber,
            },
          },
        }
      );

      res.send({
        success: true,
        msg: `Surah ${chapterName} marked as completed`,
        data: chapterAfterMarkAsRead,
      });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as complete" });
  }
};

const markChapterAsUnRead = async (req, res) => {
  console.log("Mark Chapter as Un Read progress API hit");
  try {
    const { username, chapterName, chapterNumber } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      const recitedChapters = await GitaRecitation.updateOne(
        {
          username: username,
          "recitedChapters.chapterName": chapterName,
        },
        {
          $pull: {
            recitedChapters: {
              chapterName: chapterName,
              chapterNumber: chapterNumber,
            },
          },
        }
      );

      res.send({
        success: true,
        msg: `Surah ${chapterName} marked as Incomplete`,
        data: recitedChapters,
      });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Mark as incomplete" });
  }
};

const markSummaryAsRead = async (req, res) => {
  console.log("Mark Summary as Read progress API hit");
  try {
    const { username, summaryNumber, summaryName } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      const recitedSummaries = await GitaRecitation.findOneAndUpdate(
        {
          username: username,
          "recitedSummaries.summaryName": { $ne: summaryName },
        },
        {
          $addToSet: {
            recitedSummaries: {
              summaryName: summaryName,
              summaryNumber: summaryNumber,
            },
          },
        }
      );

      res.send({
        success: true,
        msg: `Parah ${summaryName} marked as completed`,
        data: recitedSummaries,
      });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as complete" });
  }
};

const markSummaryAsUnRead = async (req, res) => {
  console.log("Mark Parah as Un Read progress API hit");
  try {
    const { username, summaryName, summaryNumber } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      const recitedSummaries = await GitaRecitation.updateOne(
        {
          username: username,
          "recitedSummaries.summaryName": summaryName,
        },
        {
          $pull: {
            recitedSummaries: {
              summaryName: summaryName,
              summaryNumber: summaryNumber,
            },
          },
        }
      );

      res.send({
        success: true,
        msg: `Parah ${summaryName} marked as Incomplete`,
        data: recitedSummaries,
      });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Mark as incomplete" });
  }
};

//Take chapterNumber, verserNum
const updateLastReadChapter = async (req, res) => {
  console.log("Update Last Read Chapter API hit", req.body);
  try {
    const { username, chapterNumber, verseNumber } = req.body;
    const isUpdatedLastReadChapter = await GitaRecitation.updateOne(
      {
        username: username,
      },
      {
        $set: {
          chapterLastRead: {
            verseNumber: verseNumber,
            chapterNumber: chapterNumber,
          },
        },
      }
    );

    if (isUpdatedLastReadChapter.acknowledged) {
      const chapterLastRead = await GitaRecitation.findOne(
        {
          username: username,
        },
        {
          chapterLastRead: 1,
          _id: 0,
        }
      );
      res.send({
        success: true,
        msg: `Updated ${chapterNumber} Parah as last read`,
        data: chapterLastRead,
      });
      return;
    }
    res.send({ success: true, msg: `Already saved as last read`, data: null });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

const updateLastReadSummary = async (req, res) => {
  console.log("Last Read Summary progress API hit");
  try {
    const { username, summaryNumber } = req.body;
    const isUpdatedLastReadSummary = await GitaRecitation.updateOne(
      {
        username: username,
      },
      {
        $set: {
          summaryLastRead: summaryNumber
        },
      }
    );

    if (isUpdatedLastReadSummary) {
      const summaryLastRead = await GitaRecitation.findOne(
        {
          username: username,
        },
        {
          summaryLastRead: 1,
          _id: 0,
        }
      );
      res.send({
        success: true,
        msg: `Updated ${summaryNumber} Summary as last read`,
        data: summaryLastRead,
      });
      return;
    }
    res.send({ success: true, msg: `Already saved as last read`, data: null });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

//Take username and return record for that user
const getRecitationStats = async (req, res) => {
  console.log("GET recitation stats API hit");
  try {
    const { username } = req.body;
    const record = await GitaRecitation.find({
      username: username,
    });

    if (record) {
      res.send({
        success: true,
        msg: "Fetched Stats Successfully",
        data: record,
      });
    } else {
      res
        .status(400)
        .send({
          success: false,
          msg: `Could not get Recitation Stats for user ${username}`,
        });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

//Get surah Name and return if it is recited
const checkChapterIsRead = async (req, res) => {
  console.log("CHECK Chapter is read API hit");
  try {
    const { username, chapterName } = req.body;
    const record = await GitaRecitation.find({
      username: username,
      "recitedChapters.chapterName": chapterName,
    });

    if (record.length == 0) {
      return res
        .status(200)
        .send({
          success: true,
          msg: "Fetched Chapter Read Status Successfully",
          data: null,
        });
    }
    res
      .status(200)
      .send({
        success: true,
        msg: "Fetched Chapter Read Status Successfully",
        data: record,
      });
    return;
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

//Get parah Name and return if it is recited
const checkSummaryIsRead = async (req, res) => {
  console.log("CHECK Summary is read API hit");
  try {
    const { username, summaryName } = req.body;
    const record = await GitaRecitation.find({
      username: username,
      "recitedSummaries.summaryName": summaryName,
    });

    if (record.length == 0) {
      return res
        .status(200)
        .send({
          success: true,
          msg: "Fetched Parah Read Status Successfully",
          data: null,
        });
    }
    res
      .status(200)
      .send({
        success: true,
        msg: "Fetched Parah Read Status Successfully",
        data: record,
      });
    return;
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Status" });
  }
};

const getLastReadChapter = async (req, res) => {
  console.log("GET LAST READ Chapter API hit");
  try {
    const { username } = req.body;
    const chapterLastRead = await GitaRecitation.findOne(
      {
        username: username,
      },
      {
        chapterLastRead: 1,
        _id: 0,
      }
    );

    res.send({
      success: true,
      msg: `Fetched Last read Chapter`,
      data: chapterLastRead,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get last read Chapter" });
  }
};

const getLastReadSummary = async (req, res) => {
  console.log("GET LAST READ Summary API hit");
  try {
    const { username } = req.body;
    const summaryLastRead = await GitaRecitation.findOne(
      {
        username: username,
      },
      {
        summaryLastRead: 1,
        _id: 0,
      }
    );

    res.send({
      success: true,
      msg: `Fetched Last read Parah`,
      data: summaryLastRead,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Last read parah" });
  }
};

module.exports = {
  markChapterAsRead,
  markChapterAsUnRead,
  markSummaryAsRead,
  markSummaryAsUnRead,
  updateLastReadChapter,
  updateLastReadSummary,
  getRecitationStats,
  checkChapterIsRead,
  checkSummaryIsRead,
  getLastReadChapter,
  getLastReadSummary,
};
