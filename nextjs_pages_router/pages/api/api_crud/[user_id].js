import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";

const handler = async (req,res) => {
    try{
        await connectDB();
        if(req.method === 'GET'){
            const {user_id} = req.query;
            if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({status: false, message: "Invalid id"});
            const user = await User.findById(user_id);
            if(!user) return res.status(404).json({status: false, message: "User not found!"});
            return res.status(200).json({status: true, data: user});
        }else if(req.method === 'PUT'){
            const {user_id} = req.query;
            if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({status: false, message: "Invalid id"});
            const {success,error,data} = validateZodResult(userSchema,req.body);
            if(!success) return res.status(400).json({status: false, message: "validation error"});
            const user = await User.findByIdAndUpdate(user_id,data);
            return res.status(200).json({status: true, message: 'Data updated successfully', user});
        }else if(req.method === 'DELETE'){
            const {user_id} = req.query;
            if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(400).json({status: false, message: "Invalid id"});
            const user = await User.findByIdAndDelete(user_id);
            return res.status(200).json({status: true, message: 'Data deleted successfully', user});
        }else{
            return res.status(405).json({status: false, message: `Method ${req.method} Not Allowed.`});
        }
    }catch(error){
        if(error.code === 11000) return res.status(500).json({status: false, message: 'Email already exists'});
        return res.status(500).json({status: false, message: error.message});
    }
}

export default handler;