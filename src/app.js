import express from "express";
import cookieParser from "cookie-parser"; // to apply CRUD on user's browser's cookie
import cors from "cors"; // for whitilisting ip of request server


const app = express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
// data come from form,url,etcc...
app.use(express.json({limit:"16KB"})) // no body parser needed for json data in recent version of express via FORM 
app.use(express.urlencoded({extended:true,limit:"16KB"}))//for data from URL
app.use(express.static("public")) // for fevicon,photo data

app.use(cookieParser()); 
export {app};