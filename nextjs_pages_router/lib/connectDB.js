import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    try{
        if(isConnected) return;
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;