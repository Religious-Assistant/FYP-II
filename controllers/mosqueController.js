const Mosque=require('../models/mosqueModel')
const User=require('../models/userModel')

const getAllMosques=async(req, res)=>{
    console.log('Find All Mosques API hit')
    try{
        const allMosques=await Mosque.find({})
        if(allMosques){
            res.status(200).send({success:true, data:allMosques})
        }
        else{
            res.status(200).send({msg:'Could not find Mosques', success:false})                
        }
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


const getClosestMosques=async(req, res)=>{

    console.log('Find closest Mosques API hit')
    
    const {longitude, latitude}=req.body

    try{

        const nearMosques=await Mosque.aggregate([
            {
                $geoNear:{
                    near:{
                        type:'Point',
                        coordinates:[parseFloat(longitude),parseFloat(latitude)]
                    },
                    key:'location',
                    maxDistance:parseFloat(1000)*1609,
                    distanceField:'dist.calculated',
                    spherical:true,
                }
            },
            { $match: { verified:true } }
        ])

        res.status(200).send({msg:'Here are closest Mosques',success:true, data:nearMosques})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const getUnverifiedMosquesAroundUser=async(req, res)=>{

    console.log('Get Unverified Mosques API hit')
    const {longitude, latitude}=req.body
    try{

        const unverifiedNearMosques=await Mosque.aggregate([
            {
                $geoNear:{
                    near:{
                        type:'Point',
                        coordinates:[parseFloat(longitude),parseFloat(latitude)]
                    },
                    key:'location',
                    maxDistance:parseFloat(1000)*1609,
                    distanceField:'dist.calculated',
                    spherical:true,
                }
            },
            { $match: { verified:false } },
        ])
        res.status(200).send({msg:'Here are Unverified Mosques around you',success:true, data:unverifiedNearMosques})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


const addMosque=async(req, res)=>{

    console.log("Add Mosque API hit")
    const{latitude,longitude,mosqueName,addedBy}=req.body

    try{

        const user=await User.findOne({username:addedBy})

        if(user){
            
            if(longitude && latitude){
                
                
                const newMosqueData=await Mosque.create({
                    mosqueName:mosqueName,
                    addedBy:addedBy,
                    location:{
                        type:'Point',
                        coordinates:[parseFloat(longitude), parseFloat(latitude)]
                    }
                })

                if(newMosqueData){
                    res.status(200).send({success:true,msg:'Added Successfully',data:newMosqueData})
                }
                else{
                    res.status(200).send({msg:'Could not add Mosque', success:false})                
                }
            }
            else{
                res.status(200).send({msg:'Invalid Locaton', success:false})                
            }
        }
        else{
            res.status(200).send({msg:'User Does not exist', success:false})
        }
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


module.exports={

    getAllMosques,
    addMosque,
    getClosestMosques,
    getUnverifiedMosquesAroundUser
}