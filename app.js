const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const path=require('path')
const admin = require("firebase-admin");
const serviceAccount = require("./religious-assistant-firebase-adminsdk-tf2ng-1fedfc6227.json");

dotenv.config()

const port=process.env.PORT || 8888;
const database_url=process.env.DATABASE_URL;

const app=express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname,'public')))
app.use('/avatars',express.static(path.join(__dirname,'public/avatars')))


mongoose.connect(database_url).then(()=>{
    console.log(`Connected to database`)
}).catch(error=>{
    console.log(`Could not connect to database`, error)
})


//routes
const user_routes=require('./routes/userRoute');
const tasbih_routes = require('./routes/tasbihRoute')
const mosque_routes=require('./routes/mosqueRoute')
const temple_routes=require('./routes/templeRoute')
const announcement_route=require('./routes/announcementRoute')
const namaz_accountability_route=require('./routes/namazAccountabilityRoute')
const fast_accountability_route=require('./routes/fastAccountabilityRoute')
const learn_namaz_route=require('./routes/learnNamazRoute')
const imam_route=require('./routes/imamRoute')
const recite_quran_route=require('./routes/reciteQuranRoute')
const muslim_pref_route=require('./routes/muslimUserPreferenceRoute')

app.use('/api', user_routes)
app.use('/api', tasbih_routes)
app.use('/api', mosque_routes)
app.use('/api', temple_routes)
app.use('/api', announcement_route)
app.use('/api', namaz_accountability_route)
app.use('/api', fast_accountability_route)
app.use('/api', learn_namaz_route)
app.use('/api', imam_route)
app.use('/api', recite_quran_route)
app.use('/api', muslim_pref_route)

// //Test API for Notification
// app.get('/api/getNotf',async(req, res)=>{

//     await sendMessage()
//     res.send("Sent Successfully")
// })



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://religious-assistant.firebaseio.com",
// });


// async function sendMessage() {
//     // Fetch the tokens from an external datastore (e.g. database)
//     const tokens = [
//             "drLOQki8T_m-V42iW_JOgM:APA91bHhAihIeUNjY-aE5UmnYctszX9G-uDU1ZJd0ocMvmO31bypic6m2g1i1-UQUNj3dXnRmR6eCPvSkfp4GVSjh7XdkXJTc7c_nm1sg_U56XtkCg3udynVS4E7XpRakKTRWzvBogsU"
//     ];
  
//     // Send a message to devices with the registered tokens
//     await admin
//       .messaging()
//       .sendMulticast({
//         tokens,
//         data: {
//           notification: JSON.stringify({
//             body: "My first ever Push-Notification :)",
//             title: "Religious Assistant",
//             //   android: {
//             //     channelId: "default",
//             //     smallIcon: "ic_launcher",
//             //     // actions: [
//             //     //   {
//             //     //     title: "Mark as Read",
//             //     //     pressAction: {
//             //     //       id: "read",
//             //     //     },
//             //     //   },
//             //     // ],
//             //   },
//           }),
//         },
//       })
//       .then((response) => {
//         console.log(response.successCount + " messages were sent successfully");
//       });
//   }

module.exports=app;