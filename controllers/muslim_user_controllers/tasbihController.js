const Tasbih = require("../../models/muslim_user_models/tasbihModel");

const updateTasbih = async (req, res) => {
  console.log(`Update Tasbih API hit`, req.body);
  try {
    const { username, count } = req.body;

    const isUserFound = await Tasbih.findOne({ username: username });
    if (isUserFound) {
      await Tasbih.updateOne({ username: username }, { $set: { count: count } })
        .then((updated) => {
          if (updated.acknowledged) {
            res
              .status(200)
              .send({
                success: true,
                msg: "Updated Tasbih",
                data: { count: count },
              });
          } else {
            res
              .status(400)
              .send({ success: false, msg: "Could not Update Tasbih" });
          }
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

const getTasbihCount = async (req, res) => {
  console.log(`GET Tasbih count API hit`);

  try {
    const { username } = req.body;

    const tasbihRecord = await Tasbih.findOne({ username: username });

    if (tasbihRecord) {
      res
        .status(200)
        .send({ success: true, msg: "Updated Tasbih", data: tasbihRecord });
    } else {
      res.status(400).send({ success: false, msg: "No record found" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not update Tasbih" });
  }
};

module.exports = {
  updateTasbih,
  getTasbihCount,
};
