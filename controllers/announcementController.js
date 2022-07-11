const Announcement=require('../models/announcementModel')
const DeviceToken = require('../models/deviceTokenModel')
const User=require('../models/userModel')

//Take announcement Data and make it available to everyone
const makeAnnouncement=async(req, res)=>{

    console.log("Make Announcement API hit")
    const{latitude,longitude,category,announcedBy, statement}=req.body

    try{

        const user=await User.findOne({username:announcedBy})

        if(user){
            
            if(longitude && latitude){
                
                
                const newAnnouncement=await Announcement.create({
                    statement:statement,
                    category:category,
                    announcedBy:announcedBy,
                    location:{
                        type:'Point',
                        coordinates:[parseFloat(longitude), parseFloat(latitude)]
                    }
                })

                if(newAnnouncement){

                    //Send it to people around this location

                    const nearByPeople=await findNearByPeople(longitude, latitude)
                    if(nearByPeople){

                        console.log(nearByPeople)
                        
                        //Get device tokens of these people

                        
                        
                        res.status(200).send({success:true,msg:'Announced Successfully',data:newAnnouncement})
                    }
                    else{
                        //Delete announcement incase of failure to find near gy people
                        await Announcement.deleteOne({_id:newAnnouncement._id})
                        res.status(200).send({msg:'Could not create announcement: No near by users', success:false})                
                    }
                }
                else{
                    res.status(200).send({msg:'Could not create announcement', success:false})                
                }
            }
            else{
                res.status(200).send({msg:'Invalid Location', success:false})                
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

//Hepler function
const findNearByPeople=async(longitude, latitude)=>{

    const peopleAround=await User.aggregate([
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
        //$match: { verified:true }
    ])

    return peopleAround?peopleAround:null;
}

//Takes username, gets all announcements
const getAllAnnouncements=async(req, res)=>{

    console.log('Get all Announcement API hit')

    try{

        res.status(200).send({msg:'Here are All Announcements',success:true, data:[]})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

//Takes Announcement Id and username, deletes announcement
const deleteAnnouncement=async(req, res)=>{

    console.log('Delete Announcement API hit')

    try{

        res.status(200).send({msg:'Announcement Deleted Successfully',success:true, data:[]})
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


module.exports={
    makeAnnouncement,
    getAllAnnouncements,
    deleteAnnouncement
}