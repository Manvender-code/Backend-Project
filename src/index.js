//require('dotenv').config({path:'./env'});
import dotenv from "dotenv"
dotenv.config({  //configuration of dot env
    path: "./.env"
})
import connectDB from "./db/indexx.js";





connectDB();




























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