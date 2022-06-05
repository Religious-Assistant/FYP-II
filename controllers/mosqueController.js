const Mosque=require('../models/mosqueModel')

const addMosque=async(req, res)=>{

    try{

    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const getClosestMosques=async(req, res)=>{

    try{

    }
    catch(error){
        res.status(400).send(error.message)
    }
}

module.exports={
    addMosque,
    getClosestMosques
}