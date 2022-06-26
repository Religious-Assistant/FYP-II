const Announcement=require('../models/announcementModel')
const User=require('../models/userModel')

//Take announcement Data and make it available to everyone
const makeAnnouncement=async(req, res)=>{

    console.log('Make Announcement API hit')

    try{

        res.status(200).send({msg:'Announcement made successfully',success:true, data:[]})
    }
    catch(error){
        res.status(400).send(error.message)
    }
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