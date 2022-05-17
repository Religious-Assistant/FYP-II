const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')

dotenv.config()

const port=process.env.PORT || 8888;
const database_url=process.env.DATABASE_URL;

const app=express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

mongoose.connect(database_url).then(()=>{
    console.log(`Connected to database`)

}).catch(error=>{
    console.log(`Could not connect to database`)
})


//routes
const user_routes=require('./routes/userRoute');

app.use('/api', user_routes)

app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})