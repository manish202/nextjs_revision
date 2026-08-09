import {useUserContext} from "@/context/UserContext";

const UserViewModal = () => {
    const {modal,toggleModel} = useUserContext();
    if(modal.type !== 'view') return null;
    const {fname,lname,email,city} = modal.user;
    return (
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
                    <button onClick={() => toggleModel(null,null)} className="rounded bg-gray-700 px-5 py-2 text-white hover:bg-gray-800">Close</button>
                </div>
            </div>
      </div>
    )
}

export default UserViewModal;