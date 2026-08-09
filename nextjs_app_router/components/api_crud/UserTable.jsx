'use client';
import {useEffect} from "react";
import useApiData from "@/hooks/useApiData";
import {useSearchParams} from "next/navigation";
import TableHeader from "./TableHeader";
import Pagination from "@/components/api_crud/Pagination";
import paginationSchema from "@/zod/paginationSchema";
import validateZodResult from "@/lib/validateZodResult";
import LoadingButton from "@/components/api_crud/LoadingButton";
import {useUserContext} from "@/context/UserContext";

const TableTh = ({title,isTxtDirCenter}) => {
    return (
        <th className={`px-6 py-4 ${isTxtDirCenter ? 'text-center':'text-left'} text-sm font-semibold text-gray-700`}>{title}</th>
    )
}

const ViewUserBtn = ({_id}) => {
    const {toggleModel} = useUserContext();
    const {apiData,setApiData,sendRequest} = useApiData();
    const getSingleUser = async (id) => {
        const {status,message,data} = await sendRequest(`/api/api_crud/${id}`);
        status ? toggleModel('view',data) : alert(message);
    }
    if(apiData.loading) return <LoadingButton />;
    return <button onClick={() => getSingleUser(_id)} className="rounded bg-sky-500 px-3 py-1 text-sm text-white hover:bg-sky-600">View</button>;
}

const EditUserBtn = ({_id}) => {
    const {toggleModel} = useUserContext();
    const {apiData,setApiData,sendRequest} = useApiData();
    const getSingleUser = async (id) => {
        const {status,message,data} = await sendRequest(`/api/api_crud/${id}`);
        status ? toggleModel('edit',data) : alert(message);
    }
    if(apiData.loading) return <LoadingButton />;
    return <button onClick={() => getSingleUser(_id)} className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600">Edit</button>;
}

const TableTrForTd = ({user}) => {
    const {toggleModel} = useUserContext();
    const {_id,fname,lname,email,city} = user;
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">{fname}</td>
            <td className="px-6 py-4">{lname}</td>
            <td className="px-6 py-4">{email}</td>
            <td className="px-6 py-4">{city}</td>
            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    <ViewUserBtn _id={_id} />
                    <EditUserBtn _id={_id} />
                    <button onClick={() => toggleModel('delete',user)} className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">Delete</button>
                </div>
            </td>
        </tr>
    )
}

const UserTable = () => {
    const {reloadTable} = useUserContext();
    const {apiData,setApiData,sendRequest} = useApiData({data:[],total_records:null});
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '5';
    useEffect(() => {
        const {success,error,data} = validateZodResult(paginationSchema,{page,limit});
        if(success){
            sendRequest(`/api/api_crud?page=${data.page}&limit=${data.limit}`);
        }else{
            setApiData(old => ({...old,errorMsg:`page number ${page} or records limit ${limit} is invalid`}));
        }
    },[page,limit,reloadTable]);
    return (
        <div className="mx-auto max-w-7xl">
            <TableHeader />
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <TableTh title="First Name" />
                                <TableTh title="Last Name" />
                                <TableTh title="Email" />
                                <TableTh title="City" />
                                <TableTh title="Actions" isTxtDirCenter={true} />
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
                {apiData.data.total_records > 0 && apiData.data.data.length > 0 && <Pagination page={Number(page)} limit={Number(limit)} total_records={apiData.data.total_records} />}
            </div>
        </div>
    )
}

export default UserTable;