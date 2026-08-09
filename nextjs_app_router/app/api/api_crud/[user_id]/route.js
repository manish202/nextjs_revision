import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";

export const GET = async (request,{params}) => {
    try{
        const {user_id} = await params;
        if(!mongoose.Types.ObjectId.isValid(user_id)) return Response.json({status: false, message: "Invalid Id"},{ status: 400 });
        await connectDB();
        const user = await User.findById(user_id);
        if(!user) return Response.json({status: false, message: "User not found!"},{ status: 404 });
        return Response.json({status: true, data: user},{ status: 200 });
    }catch(error){
        return Response.json({status: false, message: error.message},{ status: 500 });
    }
}

export const PUT = async (request,{params}) => {
    try{
        const {user_id} = await params;
        if(!mongoose.Types.ObjectId.isValid(user_id)) return Response.json({status: false, message: "Invalid Id"},{ status: 400 });
        const body = await request.json();
        const {success,error,data} = validateZodResult(userSchema,body);
        if(!success) return Response.json({status: false, message: "validation error"}, { status: 400 });
        await connectDB();
        const user = await User.findByIdAndUpdate(user_id,data);
        return Response.json({status: true, message: 'Data updated successfully', user},{ status: 200 });
    }catch(error){
        if(error.code === 11000) return Response.json({status: false, message: 'Email already exists'},{ status: 500 });
        return Response.json({status: false, message: error.message},{ status: 500 });
    }
}

export const DELETE = async (request,{params}) => {
    try{
        const {user_id} = await params;
        if(!mongoose.Types.ObjectId.isValid(user_id)) return Response.json({status: false, message: "Invalid Id"},{ status: 400 });
        await connectDB();
        const user = await User.findByIdAndDelete(user_id);
        return Response.json({status: true, message: 'Data deleted successfully', user},{ status: 200 });
    }catch(error){
        return Response.json({status: false, message: error.message},{ status: 500 });
    }
}