import mongoose from "mongoose";
import UserFormModal from "@/components/server_actions_crud/UserFormModal";
import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";
import { redirect } from 'next/navigation';

const updateDataInDB = async (formData) => {
    'use server';
    try{
        const body = Object.fromEntries(formData.entries());
        const {success,error,data} = validateZodResult(userSchema,body);
        // if there is a error in request body then we can store error in session and redirect user to the
        // add page and show error on that page from sessions.
        if(!success) return redirect(`/server_actions_crud/edit/${body?._id}`);
        await connectDB();
        await User.findByIdAndUpdate(body._id,data);
        return redirect('/server_actions_crud');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud');
    }
}

// while using useActionState hook in client component.
const updateDataInDB2 = async (previousState,formData) => {
    'use server';
    try{
        const body = Object.fromEntries(formData.entries());
        const {success,error,data} = validateZodResult(userSchema,body);
        // if there is a error in request body then we can store error in session and redirect user to the
        // add page and show error on that page from sessions.
        if(!success) return redirect(`/server_actions_crud/edit/${body?._id}`);
        await connectDB();
        await User.findByIdAndUpdate(body._id,data);
        return redirect('/server_actions_crud');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud');
    }
}

const EditSingleUserPage = async ({params}) => {
    const {user_id} = await params;
    if(!mongoose.Types.ObjectId.isValid(user_id)) return <h1>Invalid user id</h1>
    await connectDB();
    const user = await User.findById(user_id);
    if(!user) return <h1>User not found!</h1>
    const {_id,fname,lname,email,city} = user;
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <UserFormModal userAction={updateDataInDB} userAction2={updateDataInDB2} isAdd={false} user={{_id:_id.toString(),fname,lname,email,city}} />
        </div>
    )
}

export default EditSingleUserPage;