const app=require('./app')

const dotenv=require('dotenv')
dotenv.config()

const port=process.env.PORT || 8092

app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})
