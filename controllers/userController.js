const User=require('../models/userModel');
const bcryptjs=require('bcryptjs');  //For password hashing
const jwt=require('jsonwebtoken');
const {jwt_secret} = require('../config');


const registerUser=async(req, res)=>{

    try{
        const {username, password,mobile, religion}=await req.body
        const securePassword=await encryptPassword(password);
        // console.log(req.body)        
        const user=new User({
            username:username,
            password:securePassword,
            mobile: mobile,
            religion: religion
        })

        //Check if user already exists
        const duplicateUser=await User.findOne({username:username});
        if(duplicateUser){
            res.status(200).send({success:false, msg:"User already exists!"})
        }
        else{
            const user_data=await user.save();
            res.status(200).send({success:true, data:user_data})
        }

    }catch(error){
        res.status(400).send(error.message);
    }
}

const loginUser=async(req, res)=>{

    console.log(req.body)
    try{
        const {username, password}=req.body;

        const user_data=await User.findOne({username:username});

        if(user_data){
            const passwordMatch=await bcryptjs.compare(password, user_data.password);
            if(passwordMatch){
                
                const token=await createToken(user_data.username);
                const resultData={
                    _id:user_data._id,
                    username:user_data.username,
                    password:user_data.password,
                    mobile:user_data.mobile,
                    religion:user_data.religion,
                    token:token
                }
                res.send({success:true,data: resultData})
            }
            else{
                res.status(200).send({success:false, msg:"Invalid user details provided!"})
            }
        }
        else{
            res.status(200).send({success:false, msg:"Invalid user details provided!"})
        }
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const updatePassword=async(req, res)=>{
    
    try{
        const {username, password}=req.body
        console.log(username)

        const user=await User.findOne({username})
        if(user){
            const newPassword=await encryptPassword(password)
            const updatedData=await User.updateOne({username:username},{$set:{password:newPassword}})
            res.status(200).send({success:true, msg:"Password Updated Successfully!",data:updatedData})
        }
        else{
            res.status(400).send({success:false, msg:"No such user"})
        }

    }
    catch(error){
        res.status(400).send(error.message)
    }
}

async function encryptPassword(password){
    return await bcryptjs.hash(password,10);
}

async function createToken(id){
    return jwt.sign({_id:id},jwt_secret)
}

module.exports={
    registerUser,
    loginUser,
    updatePassword
}