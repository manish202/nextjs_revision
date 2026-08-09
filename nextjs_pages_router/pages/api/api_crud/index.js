import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import paginationSchema from "@/zod/paginationSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";

const handler = async (req,res) => {
    try{
        await connectDB();
        if(req.method === 'GET'){
            const {page = '1', limit = '5'} = req.query;
            // page = parseInt(page); limit = parseInt(limit);
            // page = isNaN(page) ? 1 : (page < 1 ? 1 : page);
            // limit = isNaN(limit) ? 5 : (limit < 1 ? 5 : limit);
            // if(limit > 20) return res.status(400).json({status: false, message: "You cant fetch more then 20 records at once."});
            // instead of writing above long code, i will use zod.
            const {success,error,data} = validateZodResult(paginationSchema,{page,limit});
            if(!success) return res.status(400).json({status: false, message: `page number ${page} or records limit ${limit} is invalid`});
            const offset = (data.page - 1) * data.limit;
            const users = await User.find().sort({updatedAt:-1}).skip(offset).limit(data.limit);
            const total_records = await User.countDocuments();
            return res.status(200).json({status:true,data:users,total_records,page:data.page,limit:data.limit,offset});
        }else if(req.method === 'POST'){
            const {success,error,data} = validateZodResult(userSchema,req.body);
            if(!success) return res.status(400).json({status: false, message: "validation error"});
            const user = await User.create(data);
            return res.status(201).json({status: true, message: 'Data inserted successfully', user});
        }else{
            return res.status(405).json({status: false, message: `Method ${req.method} Not Allowed.`});
        }
    }catch(error){
        if(error.code === 11000) return res.status(500).json({status: false, message: 'Email already exists'});
        return res.status(500).json({status: false, message: error.message});
    }
}

export default handler;