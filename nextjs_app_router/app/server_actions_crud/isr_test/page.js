import Link from "next/link";
import connectDB from "@/lib/connectDB";
import User from "@/model/User";

const TableTrForTd = ({user}) => {
    const {_id,fname,lname,email,city} = user;
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">{_id.toString()}</td>
            <td className="px-6 py-4">{fname}</td>
            <td className="px-6 py-4">{lname}</td>
            <td className="px-6 py-4">{email}</td>
            <td className="px-6 py-4">{city}</td>
        </tr>
    )
}

const getUsers = async () => {
    try{
        await connectDB();
        const users = await User.find().sort({updatedAt:-1}).skip(0).limit(10);
        return {status: true, users};
    }catch(error){
        return {status: false, message: error.message};
    }
}

export const revalidate = 30; // enable ISR

const IsrTestPage = async () => {
    const {status,message,users} = await getUsers();
    if(!status) return <h1>{message}</h1>;
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <div className="w-5/6">
                        <h1 className="text-3xl font-bold text-gray-800">Nextjs app router</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Here i am testing Incremental Static Re-generation (ISR)
                        </p>
                    </div>
                    <Link href="/server_actions_crud" className="w-1/6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                        All Users
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Id</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">First Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">City</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr className="hover:bg-gray-50"><td colSpan="5" className="px-6 py-4 text-center">No Records Found.</td></tr>
                                ) : (
                                    <>
                                        {users.map(user => <TableTrForTd key={user._id} user={user} />)}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IsrTestPage;