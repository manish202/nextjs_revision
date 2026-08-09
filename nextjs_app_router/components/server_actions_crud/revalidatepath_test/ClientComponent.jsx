'use client';
import {useEffect} from "react";
import useApiData from "@/hooks/useApiData";
import {userActionForClientCompo} from "@/app/server_actions_crud/revalidatepath_test/user.action";
import {useRouter} from 'next/navigation';

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

const ClientComponent = () => {
    const {apiData,setApiData,sendRequest} = useApiData({data:[]});
    const router = useRouter();
    useEffect(() => {
        sendRequest(`/api/api_crud?page=1&limit=5`);
    },[]);
    const handleUserAction = async (formData) => {
        await userActionForClientCompo(formData);
        router.refresh(); // refresh server data
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <div className="w-5/6">
                        <h1 className="text-3xl font-bold text-gray-800">Nextjs app router</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Uper hamne jo revalidatePath() method se kiya hai vahi same chiz client component mai
                            karne k liye router.refresh() method use karo.
                            router.refresh() Server Component se fresh data re-fetch karwata hai,
                        </p>
                    </div>
                    <form action={handleUserAction}>
                        <button type="submit" className="w-1/6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                            Generate random user and refresh,re-fetch fresh data from server
                        </button>
                    </form>
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
                                {apiData.loading ? (
                                    <tr className="hover:bg-gray-50"><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                                ) : apiData.errorMsg ? (
                                    <tr className="hover:bg-gray-50"><td colSpan="5" className="px-6 py-4 text-center">{apiData.errorMsg}</td></tr>
                                ) : apiData.data?.data?.length === 0 ? (
                                    <tr className="hover:bg-gray-50"><td colSpan="5" className="px-6 py-4 text-center">No Records Found.</td></tr>
                                ) : (
                                    <>
                                        {apiData.data?.data?.map(user => <TableTrForTd key={user._id} user={user} />)}
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

export default ClientComponent;