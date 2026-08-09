import mongoose from "mongoose";
import Link from "next/link";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";

const ViewSingleUserPage = async ({params}) => {
    const {user_id} = await params;
    if(!mongoose.Types.ObjectId.isValid(user_id)) return <h1>Invalid user id</h1>
    await connectDB();
    const user = await User.findById(user_id);
    if(!user) return <h1>User not found!</h1>
    const {fname,lname,email,city} = user;
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                    <h2 className="mb-5 text-2xl font-bold">User Details</h2>
                    <div className="space-y-3">
                        <p><strong>First Name:</strong> {fname}</p>
                        <p><strong>Last Name:</strong> {lname}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>City:</strong> {city}</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Link href="/server_actions_crud" className="rounded bg-gray-700 px-5 py-2 text-white hover:bg-gray-800">Close</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSingleUserPage;