const VegNonVeg = require("../../models/hindu_user_models/vegNonVegModel");

const setVegDays = async (req, res) => {
  console.log("Update Veg Days API hit");
  try {
    const { username, vegSubscription } = req.body;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      vegSubscription;

    const updatedVegData=await VegNonVeg.findOneAndUpdate(
      { username },
      {
        $set: {
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        },
      },
      {new:true, upsert:true}
    );

    if(updatedVegData){
      res.status(200).send({success:true, msg:"Update successfully", data:updatedVegData})
    }
    else{
      res.status(400).send({success:false, msg:"Could not update"})
    }
    console.log(updatedVegData)
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getVegDays = async (req, res) => {
  console.log("GET Veg Days API hit", req.body);
  try {
    const { username } = req.body;

    const vegData=await VegNonVeg.findOne({username})

    if(vegData){
      res.status(200).send({success:true,msg:`Fetched Data Successfully`, data:vegData})
    }
    else{
      res.status(400).send({success:false,msg:`No data found`,})
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  setVegDays,
  getVegDays,
};
