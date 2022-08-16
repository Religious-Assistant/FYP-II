const HinduNotification = require("../../models/hindu_user_models/hinduUserNotificationModel");

const getUserNotifications = async (req, res) => {
  console.log(`GET NOTIFICATIONS API hit `);
  try {
    const { username } = req.body;
    const result = await HinduNotification.find({ receivedBy: username });

    if (result.length > 0) {
      res
        .status(200)
        .send({
          success: true,
          msg: `Fetched Notifications Successfully`,
          data: result,
        });
    } else {
      res.status(200).send({ success: false, msg: `No Notification found` });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not load Notifications" });
  }
};

const deleteHinduNotification = async (req, res) => {
  console.log("Delete Announcement API hit");

  try {
    const { username, notificationId } = req.body;

    await HinduNotification.findOneAndDelete({
      _id: notificationId,
      receivedBy: username,
    });

    const notifictions = await HinduNotification.find({
      receivedBy: username,
    });

    res.status(200).send({
      msg: "Notification Deleted Successfully",
      success: true,
      data: notifictions,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUserNotifications,
  deleteHinduNotification,
};
