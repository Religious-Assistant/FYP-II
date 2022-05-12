const express=require('express')
const app=express()
const mongoose=require('mongoose')

const {port, database_url}=require('./config')

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