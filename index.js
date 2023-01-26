const express=require("express");

const mongoose=require("mongoose")

const cors=require("cors");

// require("dotenv").config();

const app=express();

const port=process.env.PORT || 8080;

const connect=require("./config/dbConnector");

mongoose.set("strictQuery",true);

connect();

app.use(cors());

app.use(express.json());

const userRouter=require("./routes/user.router");

const categoryRouter=require("./routes/category.router")

app.use("/",userRouter);
app.use("/",categoryRouter)

app.listen(port,()=>{
    console.log("Server listening at:",port);
})