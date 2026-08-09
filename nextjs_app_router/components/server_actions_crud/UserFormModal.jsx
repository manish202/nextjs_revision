'use client';
import {useState,useTransition,useActionState} from "react";
import {useFormStatus} from 'react-dom';
import Link from "next/link";
import userSchema from "@/zod/userSchema";
import validateZodResult from "@/lib/validateZodResult";
import LoadingButton from "@/components/server_actions_crud/LoadingButton";

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

// // 1st way, action={userAction}, no validation, no loading state.
// const UserFormModal1 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" action={userAction}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <div className="flex justify-end gap-3 pt-2">
//                         <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>
//                         <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal1;

// // 2nd way, action={userAction}, no validation, loading state with useFormStatus hook.
// const Submit = () => {
//     // useFormStatus hook - get form submission status and update UI based on form status.
//     const { pending, data, method, action } = useFormStatus();
//     console.log({ pending, data, method, action });
//     return (
//         <div className="flex justify-end gap-3 pt-2">
//             {!pending && <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>}
//             {pending ? (<LoadingButton />) : (
//                 <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//             )}
//         </div>
//     )
// }
// const UserFormModal2 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" action={userAction}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <Submit />
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal2;

// // 3rd way, action={formAction}, no validation, loading state with useActionState hook.
// const UserFormModal3 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     // useActionState hook - allows you to update state based on the result of a form action.
//     const [state, formAction, isPending] = useActionState(userAction2, null);
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" action={formAction}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <div className="flex justify-end gap-3 pt-2">
//                         {!isPending && <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>}
//                         {isPending ? (<LoadingButton />) : (
//                             <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal3;

// // 4th way, onSubmit={handleSubmit}, with validation, no loading state.
// const UserFormModal4 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const {success,error,data} = validateZodResult(userSchema,input);
//         if(!success){
//             setInputError(old => ({...initialError,...error}));
//         }else{
//             setInputError(initialError);
//             // NOTE: instead of using FormData we can also send plain JS object in server action/function.
//             const formData = new FormData(e.target);
//             userAction(formData);
//         }
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <div className="flex justify-end gap-3 pt-2">
//                         <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>
//                         <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal4;

// // 5th way, onSubmit={handleSubmit}, with validation, loading state with useTransition hook.
// const UserFormModal5 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     // useTransition hook - update state without blocking the ui.
//     const [isPending,startTransition] = useTransition();
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const {success,error,data} = validateZodResult(userSchema,input);
//         if(!success){
//             setInputError(old => ({...initialError,...error}));
//         }else{
//             setInputError(initialError);
//             // NOTE: instead of using FormData we can also send plain JS object in server action/function.
//             // we can update state manually based on the result of a form action. we can also do the
//             // same thing by using useActionState hook where we dont need to update state manually.
//             // startTransition - update state without blocking the ui.
//             startTransition(async () => {
//                 const formData = new FormData(e.target);
//                 const result = await userAction(formData);
//             });
//         }
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <div className="flex justify-end gap-3 pt-2">
//                         {!isPending && <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>}
//                         {isPending ? (<LoadingButton />) : (
//                             <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal5;

// // 6th way, onSubmit={handleSubmit}, with validation, loading state with useFormStatus hook.
// // NOTE : useFormStatus and useActionState hook ko sirf action={userAction} k sath hi use karna chahiye.
// // NOTE : according to chatgpt this 6th way is not a valid so ignore it.
// import {startTransition} from 'react';
// const Submit = () => {
//     // useFormStatus hook - get form submission status and update UI based on form status.
//     const { pending, data, method, action } = useFormStatus();
//     console.log({ pending, data, method, action });
//     return (
//         <div className="flex justify-end gap-3 pt-2">
//             {!pending && <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>}
//             {pending ? (<LoadingButton />) : (
//                 <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
//             )}
//         </div>
//     )
// }
// const UserFormModal6 = ({userAction,userAction2,isAdd,user}) => {
//     const [input,setInput] = useState(isAdd ? initialInput : user);
//     const [inputError,setInputError] = useState(initialError);
//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setInput(old => ({...old,[name]:value}));
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const {success,error,data} = validateZodResult(userSchema,input);
//         if(!success){
//             setInputError(old => ({...initialError,...error}));
//         }else{
//             setInputError(initialError);
//             // NOTE: instead of using FormData we can also send plain JS object in server action/function.
//             // we can update state manually based on the result of a form action. we can also do the
//             // same thing by using useActionState hook where we dont need to update state manually.
//             // startTransition - update state without blocking the ui.
//             startTransition(async () => {
//                 const formData = new FormData(e.target);
//                 const result = await userAction(formData);
//             });
//         }
//     }
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//             <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
//                 <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
//                     <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
//                     <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
//                     <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
//                     <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
//                     <Submit />
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserFormModal6;

// 7th way, onSubmit={handleSubmit}, with validation, loading state with useActionState hook.
// NOTE : useFormStatus and useActionState hook ko sirf action={userAction} k sath hi use karna chahiye.
// NOTE : according to chatgpt this 7th way is technically valid so we can use it.
import {startTransition} from 'react';
const UserFormModal7 = ({userAction,userAction2,isAdd,user}) => {
    const [input,setInput] = useState(isAdd ? initialInput : user);
    const [inputError,setInputError] = useState(initialError);
    // useActionState hook - allows you to update state based on the result of a form action.
    const [state, formAction, isPending] = useActionState(userAction2, null);
    const handleChange = (e) => {
        const {name,value} = e.target;
        setInput(old => ({...old,[name]:value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const {success,error,data} = validateZodResult(userSchema,input);
        if(!success){
            setInputError(old => ({...initialError,...error}));
        }else{
            setInputError(initialError);
            // NOTE: instead of using FormData we can also send plain JS object in server action/function.
            // instead of using onSubmit={handleSubmit} we can also do action={formAction}
            // startTransition - update state without blocking the ui.
            startTransition(() => {
                const formData = new FormData(e.target);
                formAction(formData);
            });
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-5 text-2xl font-bold">{isAdd ? 'Add User':'Edit User'}</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isAdd && <input type="hidden" name="_id" value={user?._id} />}
                    <InputBox label="First Name" type="text" name="fname" value={input.fname} onChange={handleChange} errMsg={inputError.fname} />
                    <InputBox label="Last Name" type="text" name="lname" value={input.lname} onChange={handleChange} errMsg={inputError.lname} />
                    <InputBox label="Email" type="email" name="email" value={input.email} onChange={handleChange} errMsg={inputError.email} />
                    <InputBox label="City" type="text" name="city" value={input.city} onChange={handleChange} errMsg={inputError.city} />
                    <div className="flex justify-end gap-3 pt-2">
                        {!isPending && <Link href="/server_actions_crud" className="rounded border px-5 py-2 hover:bg-gray-100">Cancel</Link>}
                        {isPending ? (<LoadingButton />) : (
                            <button type="submit" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Save</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserFormModal7;