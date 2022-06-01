const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const path=require('path')

dotenv.config()

const port=process.env.PORT || 8888;
const database_url=process.env.DATABASE_URL;

const app=express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname,'public')))

mongoose.connect(database_url).then(()=>{
    console.log(`Connected to database`)
}).catch(error=>{
    console.log(`Could not connect to database`, error)
})


//routes
const user_routes=require('./routes/userRoute');

app.use('/api', user_routes)

app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})
