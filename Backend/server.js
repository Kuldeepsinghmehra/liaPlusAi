const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const app=express();
app.use(express.json())
app.use(cors())
const authRoutes=require('./Routes/authRoutes')
const blogRoutes=require('./Routes/blogRoutes')

app.use('/api/auth',authRoutes)
app.use('/api/blogs',blogRoutes)
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDb Connected");
    app.listen(process.env.PORT||5000,()=>{
        console.log(`server running on port ${process.env.PORT}`)
    })
}).catch((err)=>console.error(err));