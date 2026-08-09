import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const initialState = {isLoading: false, isError:null, data:{}};

const SingleBlog = () => {
    const obj = useParams();
    const [state,setState] = useState(initialState);
    const getData = async (id) => {
        try{
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if(!res.ok) throw new Error('failed to get data');
            const data = await res.json();
            setState(old => ({...initialState,data}));
        }catch(error){
            setState(old => ({...initialState,isError:error.message}));
        }
    }
    useEffect(() => {
        if(obj?.blog_id){
            setState(old => ({...initialState,isLoading:true}));
            getData(obj?.blog_id);
        }
    },[obj?.blog_id]);
    if(!obj?.blog_id) return <h1>Loading blog_id...</h1>
    if(state.isLoading) return <h1>Loading....</h1>
    if(state.isError) return <h1>{state.isError}</h1>
    return (
        <ul className="container">
            <li>ID: {state.data.id}</li>
            <li>ID: {state.data.title}</li>
            <li>ID: {state.data.body}</li>
            <li>
                <Link href={`/blogs`}>Go to All blogs</Link>
            </li>
        </ul>
    )
}

export default SingleBlog;