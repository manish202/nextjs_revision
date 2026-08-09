import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";
import DeleteModal from "@/components/server_actions_crud/DeleteModal";
import { redirect } from "next/navigation";

const deleteUserFromDB = async (id) => {
    'use server';
    try{
        await connectDB();
        await User.findByIdAndDelete(id);
        return redirect('/server_actions_crud');
    }catch(error){
        console.log(error);
        return redirect('/server_actions_crud');
    }
}

const DeleteSingleUserPage = async ({params}) => {
    const {user_id} = await params;
    if(!mongoose.Types.ObjectId.isValid(user_id)) return <h1>Invalid user id</h1>
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <DeleteModal userAction={deleteUserFromDB} user_id={user_id} />
        </div>
    )
}

export default DeleteSingleUserPage;