import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import paginationSchema from "@/zod/paginationSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";

export const GET = async (request) => {
    try{
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") ?? '1';
        const limit = searchParams.get("limit") ?? '5';
        const {success,error,data} = validateZodResult(paginationSchema,{page,limit});
        if(!success) return Response.json({status: false, message: `page number ${page} or records limit ${limit} is invalid`}, { status: 400 });
        await connectDB();
        const offset = (data.page - 1) * data.limit;
        const users = await User.find().sort({updatedAt:-1}).skip(offset).limit(data.limit);
        const total_records = await User.countDocuments();
        return Response.json({status:true,data:users,total_records,page:data.page,limit:data.limit,offset},{ status: 200 });
    }catch(error){
        return Response.json({status: false, message: error.message},{ status: 500 });
    }
}

export const POST = async (request) => {
    try{
        const body = await request.json();
        const {success,error,data} = validateZodResult(userSchema,body);
        if(!success) return Response.json({status: false, message: "validation error"}, { status: 400 });
        await connectDB();
        const user = await User.create(data);
        return Response.json({status: true, message: 'Data inserted successfully', user},{ status: 200 });
    }catch(error){
        if(error.code === 11000) return Response.json({status: false, message: 'Email already exists'},{ status: 500 });
        return Response.json({status: false, message: error.message},{ status: 500 });
    }
}