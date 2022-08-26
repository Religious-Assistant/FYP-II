const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const path=require('path')
const cloudinary = require("cloudinary").v2;

const admin = require("firebase-admin");
const serviceAccount = require("./religious-assistant-firebase-adminsdk-tf2ng-1fedfc6227.json");

dotenv.config()

const database_url=process.env.DATABASE_URL;

const app=express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(fileUpload({useTempFiles:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/avatars',express.static(path.join(__dirname,'public/avatars')))


mongoose.connect(database_url).then(()=>{
    console.log(`Connected to database`)
}).catch(error=>{
    console.log(`Could not connect to database`, error)
})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
});
    

//common routes
const user_routes=require('./routes/common_routes/userRoute');

//Muslim routes
const tasbih_routes = require('./routes/muslim_user_routes/tasbihRoute')
const mosque_routes=require('./routes/muslim_user_routes/mosqueRoute')
const muslim_notification_route=require('./routes/muslim_user_routes/muslimNotificationRoute')
const muslim_user_announcement_route=require('./routes/muslim_user_routes/muslimAnnouncementRoute')
const namaz_accountability_route=require('./routes/muslim_user_routes/namazAccountabilityRoute')
const fast_accountability_route=require('./routes/muslim_user_routes/fastAccountabilityRoute')
const learn_namaz_route=require('./routes/muslim_user_routes/learnNamazRoute')
const imam_route=require('./routes/muslim_user_routes/imamRoute')
const recite_quran_route=require('./routes/muslim_user_routes/reciteQuranRoute')
const muslim_pref_route=require('./routes/muslim_user_routes/muslimUserPreferenceRoute')
const quranInfo_route=require('./routes/muslim_user_routes/quranInfoRoute')
const namaz_timings_route=require('./routes/muslim_user_routes/namazTimingsRoute')

//Hindu routes
const temple_routes=require('./routes/hindu_user_routes/templeRoute')
const hindu_pref_route=require('./routes/hindu_user_routes/hinduUserPreferenceRoute')
const hindu_announdement_route=require('./routes/hindu_user_routes/hinduAnnouncementRoute')
const hindu_notification_route=require('./routes/hindu_user_routes/hinduNotificationRoute')
const recite_gita_route = require('./routes/hindu_user_routes/reciteGitaRoute')
const veg_non_veg_route = require('./routes/hindu_user_routes/vegNonVegRoute')
const namaz_alarms_route = require('./routes/muslim_user_routes/namazAlarmsRoute')

//Common endpoints
app.use('/api', user_routes)

//Muslim endpoints
app.use('/api', tasbih_routes)
app.use('/api', mosque_routes)
app.use('/api', muslim_user_announcement_route)
app.use('/api', namaz_accountability_route)
app.use('/api', fast_accountability_route)
app.use('/api', learn_namaz_route)
app.use('/api', imam_route)
app.use('/api', recite_quran_route)
app.use('/api', muslim_pref_route)
app.use('/api', quranInfo_route)
app.use('/api', muslim_notification_route)
app.use('/api', namaz_timings_route)
app.use('/api', namaz_alarms_route)

//Hindu endpoints
app.use('/api', temple_routes)
app.use('/api', hindu_announdement_route)
app.use('/api', hindu_pref_route)
app.use('/api', hindu_notification_route)
app.use('/api', recite_gita_route)
app.use('/api', veg_non_veg_route)


// FCM: Notification configuration


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://religious-assistant.firebaseio.com",
});

module.exports=app;


//TODO: Remove all hard coded variables outside of files