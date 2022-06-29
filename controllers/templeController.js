const Temple=require('../models/templeModel')
const User=require('../models/userModel')

const getAllTemples=async(req, res)=>{
    console.log('Find All Temples API hit')
    try{
        const allTemples=await Temple.find({})
        if(allTemples){
            res.status(200).send({success:true, data:allTemples})
        }
        else{
            res.status(200).send({msg:'Could not find Temples', success:false})                
        }
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


const getClosestTemples=async(req, res)=>{

    console.log('Find closest Temples API hit')
    
    const {longitude, latitude}=req.body

    try{

        const nearTemples=await Temple.aggregate([
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

        res.status(200).send({msg:'Here are closest Temples',success:true, data:nearTemples})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const getUnverifiedTemplesAroundUser=async(req, res)=>{

    console.log('Get Unverified Temples API hit')
    const {longitude, latitude}=req.body
    try{

        const unverifiedNearTemples=await Temple.aggregate([
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
        res.status(200).send({msg:'Here are Unverified Temples around you',success:true, data:unverifiedNearTemples})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


const addTemple=async(req, res)=>{

    console.log("Add Temple API hit")
    const{latitude,longitude,templeName,addedBy}=req.body

    try{

        const user=await User.findOne({username:addedBy})

        if(user){
            
            if(longitude && latitude){
                
                
                const newTempleData=await Temple.create({
                    templeName:templeName,
                    addedBy:addedBy,
                    location:{
                        type:'Point',
                        coordinates:[parseFloat(longitude), parseFloat(latitude)]
                    }
                })

                if(newTempleData){
                    res.status(200).send({success:true,msg:'Added Successfully',data:newTempleData})
                }
                else{
                    res.status(200).send({msg:'Could not add Temple', success:false})                
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

    getAllTemples,
    addTemple,
    getClosestTemples,
    getUnverifiedTemplesAroundUser
}