import UserFormModal from "@/components/server_actions_crud/UserFormModal";
import connectDB from "@/lib/connectDB";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import User from "@/model/User";
import { redirect } from 'next/navigation';

const insertDataInDB = async (formData) => {
    'use server';
    try{
        const body = Object.fromEntries(formData.entries());
        const {success,error,data} = validateZodResult(userSchema,body);
        // if there is a error in request body then we can store error in session and redirect user to the
        // add page and show error on that page from sessions.
        if(!success) return redirect('/server_actions_crud/add');
        await connectDB();
        await User.create(data);
        return redirect('/server_actions_crud');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud');
    }
}

// while using useActionState hook in client component.
const insertDataInDB2 = async (previousState,formData) => {
    'use server';
    try{
        const body = Object.fromEntries(formData.entries());
        const {success,error,data} = validateZodResult(userSchema,body);
        // if there is a error in request body then we can store error in session and redirect user to the
        // add page and show error on that page from sessions.
        if(!success) return redirect('/server_actions_crud/add');
        await connectDB();
        await User.create(data);
        return redirect('/server_actions_crud');
    }catch(error){
        console.log(error);
        if(error.message === "NEXT_REDIRECT") throw error;
        return redirect('/server_actions_crud');
    }
}

const AddUserFormPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <UserFormModal userAction={insertDataInDB} userAction2={insertDataInDB2} isAdd={true} />
        </div>
    )
}

export default AddUserFormPage;