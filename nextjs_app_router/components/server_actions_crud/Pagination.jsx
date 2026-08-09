import Link from "next/link";

const Pagination = ({page,limit,total_records}) => {
    const total_pages = Math.ceil(total_records / limit);
    const offset = (page - 1) * limit;
    return (
        <div className="flex items-center justify-between border-t bg-white px-6 py-4">
            <p className="text-sm text-gray-500">Showing {offset+1} to {Math.min(offset+limit,total_records)} of {total_records} entries</p>
            <div className="flex gap-2">
                {page > 1 && <Link href={`/server_actions_crud?page=${page-1}&limit=${limit}`} className="rounded border px-3 py-1 hover:bg-gray-100">Previous</Link>}
                {Array.from({ length: total_pages }, (_, i) => (
                    <Link href={`/server_actions_crud?page=${i+1}&limit=${limit}`} key={i+1} className={`rounded ${page === i+1 ? 'bg-blue-600 px-3 py-1 text-white':'border px-3 py-1 hover:bg-gray-100'}`}>{i+1}</Link>
                ))}
                {page < total_pages && <Link href={`/server_actions_crud?page=${page+1}&limit=${limit}`} className="rounded border px-3 py-1 hover:bg-gray-100">Next</Link>}
            </div>
        </div>
    )
}

export default Pagination;