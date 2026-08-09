import {useUserContext} from "@/context/UserContext";

const TableHeader = () => {
    const {toggleModel} = useUserContext();
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="w-5/6">
                <h1 className="text-3xl font-bold text-gray-800">Nextjs pages router</h1>
                <p className="mt-2 text-sm text-gray-500">
                    we can use action="/api/api_crud" while submitting form, but submitting form
                    directly at api endpoint is not a good practice, so i will use fetch/axios for
                    submitting form data.
                    So, here i am performing CURD operation through /pages/api routes.
                </p>
            </div>
            <button onClick={() => toggleModel('add',null)} className="w-1/6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                + Add New
            </button>
        </div>
    )
}

export default TableHeader;