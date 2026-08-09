import Link from "next/link";
import TableHeader from "./TableHeader";
import Pagination from "@/components/server_actions_crud/Pagination";

const TableTh = ({title,isTxtDirCenter}) => {
    return (
        <th className={`px-6 py-4 ${isTxtDirCenter ? 'text-center':'text-left'} text-sm font-semibold text-gray-700`}>{title}</th>
    )
}

const TableTrForTd = ({user}) => {
    const {_id,fname,lname,email,city} = user;
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">{fname}</td>
            <td className="px-6 py-4">{lname}</td>
            <td className="px-6 py-4">{email}</td>
            <td className="px-6 py-4">{city}</td>
            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                    <Link href={`/server_actions_crud/view/${_id}`} className="rounded bg-sky-500 px-3 py-1 text-sm text-white hover:bg-sky-600">View</Link>
                    <Link href={`/server_actions_crud/edit/${_id}`} className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600">Edit</Link>
                    <Link href={`/server_actions_crud/delete/${_id}`} className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">Delete</Link>
                </div>
            </td>
        </tr>
    )
}

const UserTable = ({users,total_records,page,limit}) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
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
                    {total_records > 0 && users.length > 0 && <Pagination page={Number(page)} limit={Number(limit)} total_records={total_records} />}
                </div>
            </div>
        </div>
    )
}

export default UserTable;