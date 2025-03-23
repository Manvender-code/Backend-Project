//require('dotenv').config({path:'./env'});
import dotenv from "dotenv"
dotenv.config({  //configuration of dot env
    path: "./.env"
})
import connectDB from "./db/indexx.js";
import { app } from "./app.js";





connectDB().
then(()=>{
    /*app.on("error",(error)=>{
        console.log("ERR:",error);
        throw error
    })*/
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port : ${process.env.PORT}`);
    })
}

).
catch((err)=>{
    console.log("db connection failed", err);
})




























/*
(async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // we can also add app.on and app.listen in it also 
    } catch (error) {
        console.error("Error occured",error);
        throw(error);
    }
})()*/