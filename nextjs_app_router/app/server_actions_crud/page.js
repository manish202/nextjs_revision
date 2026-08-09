import paginationSchema from "@/zod/paginationSchema";
import validateZodResult from "@/lib/validateZodResult";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import UserTable from "@/components/server_actions_crud/UserTable";

const getUsers = async ({page,limit}) => {
    try{
        await connectDB();
        const offset = (page - 1) * limit;
        const users = await User.find().sort({updatedAt:-1}).skip(offset).limit(limit);
        const total_records = await User.countDocuments();
        return {status: true, users, total_records};
    }catch(error){
        return {status: false, message: error.message};
    }
}

const ServerActionsCRUDPage = async ({searchParams}) => {
    const {page = '1', limit = '5'} = await searchParams;
    const {success,error,data} = validateZodResult(paginationSchema,{page,limit});
    if(!success) return <h1>page number ${page} or records limit ${limit} is invalid</h1>
    const {status,message,users,total_records} = await getUsers(data);
    if(!status) return <h1>{message}</h1>;
    return <UserTable users={users} total_records={total_records} page={page} limit={limit} />;
}

export default ServerActionsCRUDPage;