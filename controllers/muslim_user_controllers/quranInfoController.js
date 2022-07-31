const QuranInfo=require('../../models/muslim_user_models/quranInfo')

const getParahs=async(req, res)=>{
    console.log('GET PARAHS API hit')
    try{
        const parahs=await QuranInfo.find()
         if(parahs){
            res.status(200).send({success:true, msg:'Fetched Parahs Successfully', data:parahs[0].parahs})
        }
        else{
            res.status(200).send({msg:'Could not fetch Parahs', success:false})                
        }
    }
    catch(error){
        res.status(400).send(error.message)
    }
}



module.exports={
    getParahs
}