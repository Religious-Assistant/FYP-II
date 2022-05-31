const User=require('../models/userModel');
const bcryptjs=require('bcryptjs');  //For password hashing
const jwt=require('jsonwebtoken');
const path=require('path')
const fs = require("fs");

const jwt_secret=process.env.JWT_KEY;

const registerUser=async(req, res)=>{


    try{
        const {username, password,mobile, religion}=await req.body
        const securePassword=await encryptPassword(password);
        

        const user=new User({
            username:username,
            password:securePassword,
            mobile: mobile,
            religion: religion,
            avatar:"avatar.png"           
        })

        //Check if user already exists
        const duplicateUser=await User.findOne({username:username});
        if(duplicateUser){
            res.status(200).send({success:false, msg:"User already exists!"})
        }
        else{
            const user_data=await user.save();

            const directoryPath ='../public/avatars'; 
            await fs.readdir(path.resolve(__dirname,directoryPath), function (err, files) {
                if (err) {
                  return console.log("Unable to scan directory: " + err);
                }
                
                files.forEach(function(file) {
                    
                    if (file === 'avatar.png') {
                        // image=`http://localhost:${port}/public/`
                        const image=fs.readFileSync(path.resolve(__dirname,`${directoryPath}/${file}`))
                        console.log(image)
                        res.status(200).send({success:true, data:user_data, avatar:image})
                        return
                    }
                });
            })
        }

    }catch(error){
        res.status(400).send(error.message);
    }
}

const loginUser=async(req, res)=>{

    console.log(req.body)
    try{
        const {username, password}=req.body || req.query || req.params;

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

const updateProfileImage=async(req,res)=>{

    try{
        const image=req.files.avatar
        const {username}=req.body
        console.log(image.name)

        const user=await User.findOne({username})
        if(user){

            image.mv(path.resolve(__dirname,"public/avatars"),(error)=>{
                // if(!error){
                //     const updatedData=await User.updateOne({username:username},{$set:{avatar:image.name}})                    
                // }
                // else{
                //     res.send({success:false, msg:'Failed to upload image'})
                // }
                
            })
        }
        else{
            res.status(400).send({success:false, msg:"No such user"})
        }

    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const getProfile=async(req, res)=>{
    // const image=await fs.readFileSync(path.resolve(__dirname,`public/avatars/avatar.png`))
    // res.send({avatar:image})
    res.send({msg:"Success"})
}
async function encryptPassword(password){
    return await bcryptjs.hash(password,5);
}

async function createToken(id){
    return jwt.sign({_id:id},jwt_secret)
}

module.exports={
    registerUser,
    loginUser,
    updatePassword,
    updateProfileImage,
    getProfile

}