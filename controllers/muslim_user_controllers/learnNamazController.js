const LearnNamaz = require("../../models/muslim_user_models/learnNamazModel");
 
const updateProgress = async (req, res) => {
  try {

    const {username, namaz}=req.body


    let updatedProgress;
    if(namaz.namazName.toLowerCase()=='fajr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==2){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Sunnah:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='fajr' && namaz.rakatName.toLowerCase()=='farz' && namaz.rakats==2){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    if(namaz.namazName.toLowerCase()=='zuhr' && namaz.rakatName.toLowerCase()=='sunnat' && namaz.rakats==4){
      
      updatedProgress=await LearnNamaz.findOneAndUpdate({ username: username }, {learnedNamaz:{fajr:{hasLearned2Farz:true}}, username:username},{ upsert: true, new:true });
      console.log(updatedProgress)
    }

    


    if(updatedProgress){
      res.status(200).send({success:true,msg:`Updated Successfully`, data:updatedProgress})
    }
    else{
      res.status(400).send({success:false,msg:`Could not update progress`})
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

    console.log(username);
    res.status(200).send({success:true, msg:"Fetched progress successfully"})

  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not get Progress" });
  }
};

module.exports = {
  updateProgress,
  getProgress,
};
