import {useState,useEffect} from "react";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import LoadingButton from "@/components/api_crud/LoadingButton";
import {useUserContext} from "@/context/UserContext";
import useApiData from "@/hooks/useApiData";

const InputBox = ({label,errMsg,...others}) => {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">{label}</label>
            <input {...others} className="w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500" />
            {errMsg && <p className="mt-1 text-sm text-red-600">{errMsg}</p>}
        </div>
    )
}

const initialInput = {fname:'',lname:'',email:'',city:''};
const initialError = {fname:null,lname:null,email:null,city:null};

const UserFormModal = () => {
    const {modal,toggleModel,reloadTblNow} = useUserContext();
    const [input,setInput] = useState(initialInput);
    const [inputError,setInputError] = useState(initialError);
    const {apiData,setApiData,sendRequest} = useApiData();
    useEffect(() => {
        if(modal.type === 'edit'){ setInput(modal.user); }
    },[modal.user]);
    const handleChange = (e) => {
        const {name,value} = e.target;
        setInput(old => ({...old,[name]:value}));
    }
    const sendData = async (data,url,method) => {
        await sendRequest(url,{
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setInput(initialInput);
        toggleModel(null,null);
        reloadTblNow();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const {success,error,data} = validateZodResult(userSchema,input);
        if(!success){
            setInputError(old => ({...initialError,...error}));
        }else{
            setInputError(initialError);
            modal.type === 'add' ? sendData(data,'/api/api_crud','POST') : sendData(data,`/api/api_crud/${input._id}`,'PUT');
        }
    }
    if(!['add','edit'].includes(modal.type)) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-5 text-2xl font-bold">{modal.type === 'add' ? 'Add User':'Edit User'}</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
                    <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
                    <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
                    <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
                    <div className="flex justify-end gap-3 pt-2">
                        {!apiData.loading && <button onClick={() => toggleModel(null,null)} type="button" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</button>}
                        {apiData.loading ? (<LoadingButton />) : (
                            <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
                        )}
                    </div>
                </form>
            </div>
      </div>
    )
}

export default UserFormModal;