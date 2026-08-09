import {useUserContext} from "@/context/UserContext";
import useApiData from "@/hooks/useApiData";
import LoadingButton from "@/components/api_crud/LoadingButton";

const DeleteModal = () => {
    const {modal,toggleModel,reloadTblNow} = useUserContext();
    const {apiData,setApiData,sendRequest} = useApiData();
    if(modal.type !== 'delete') return null;
    const deleteSingleUser = async (id) => {
        const {status,message} = await sendRequest(`/api/api_crud/${id}`,{method:'DELETE'});
        if(status){
            toggleModel(null,null);
            reloadTblNow();
        }
        alert(message);
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                <h2 className="text-xl font-bold text-red-600">Delete User</h2>
                <p className="mt-3 text-gray-600">
                    Are you sure you want to delete this user ? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => toggleModel(null,null)} className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</button>
                    {apiData.loading ? (<LoadingButton />) : (
                        <button onClick={() => deleteSingleUser(modal.user._id)} className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700">Confirm</button>
                    )}
                </div>
            </div>
      </div>
    )
}

export default DeleteModal;