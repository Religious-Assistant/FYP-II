const Tasbih = require("../models/tasbihModel");

const updateTasbih = async (req, res) => {
  console.log(`Update Tasbih API hit`, req.body);
  try {
    const { username, count } = req.body;

    const isUserFound = await Tasbih.findOne({ username: username });
    if (isUserFound) {
      await Tasbih.updateOne({ username: username }, { $set: { count: count } })
        .then((updated) => {
          res.status(200).send({ success: true, msg: "Updated Tasbih" });
        })
        .catch((err) => {
          res
            .status(400)
            .send({ success: false, msg: "Could not update Tasbih" });
        });
    } else {
      res.status(400).send({ success: false, msg: "User Does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not update Tasbih" });
  }
};

module.exports = {
  updateTasbih,
};
