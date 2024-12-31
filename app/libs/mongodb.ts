import mongoose from "mongoose";

export default async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL || '')
        console.log('connection is established with database')
    } catch (error:any) {
        console.log(error.message)
    }
}