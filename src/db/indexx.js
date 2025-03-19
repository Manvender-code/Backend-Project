import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB is connected and my instance is ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.error("Error Error Error database connect nhi hua",error);
        process.exit(1);
    }
}
export default connectDB;