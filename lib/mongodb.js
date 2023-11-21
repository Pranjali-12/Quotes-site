import mongoose from "mongoose";

export const connectMongo=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error",error)
    }
}