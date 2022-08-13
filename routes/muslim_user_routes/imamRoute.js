const express=require('express')
const { becomeImam, updateNamazTimes, getImamById, casteUpVoteForImam, castDownvoteForImam } = require('../../controllers/muslim_user_controllers/imamController')
const imam_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

imam_route.post('/become-imam',authMiddleWare,becomeImam)
imam_route.patch('/update-namaz-times',authMiddleWare,updateNamazTimes)
imam_route.post('/get-imam-by-id',authMiddleWare,getImamById)
imam_route.patch('/cast-up-vote-for-imam',authMiddleWare,casteUpVoteForImam)
imam_route.patch('/cast-down-vote-for-imam',authMiddleWare,castDownvoteForImam)

module.exports=imam_route