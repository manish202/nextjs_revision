'use client';
import {useUserContext} from "@/context/UserContext";

const TableHeader = () => {
    const {toggleModel} = useUserContext();
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="w-5/6">
                <h1 className="text-3xl font-bold text-gray-800">Nextjs app router</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Here i am performing CURD operation with my custom APIS.
                </p>
            </div>
            <button onClick={() => toggleModel('add',null)} className="w-1/6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                + Add New
            </button>
        </div>
    )
}

export default TableHeader;