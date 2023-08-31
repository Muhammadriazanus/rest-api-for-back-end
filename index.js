import express from "express"
import UserRouters from "./routers/users.js";
import authRouters from "./routers/auth.js";
import postRouters  from "./routers/post.js";

const app = express()
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
  




dotenv.config();
const uri =   "mongodb+srv://muhammadanas:KYaIN0ScURhVXgAS@restapi3.wvodhzo.mongodb.net/muhammadanas?retryWrites=true&w=majority"
const connectDB = ()=>{
    console.log("connect DB");
    return mongoose.connect(uri,{
        useNewUrlParser :true,
        useUnifiedTopology : true,

    })
}
connectDB()


// middleWare
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",UserRouters)
app.use("/api/auth",authRouters)
app.use("/api/posts",postRouters)

app.listen(6500, () => {
    console.log("Backend server is runing");
})
