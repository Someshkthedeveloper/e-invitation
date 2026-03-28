import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Databae connected")
    }
    catch(e){
        console.log(e)
        process.exit(1)
    }
}