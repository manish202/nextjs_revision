'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const initialState = {isLoading: false, isError:null, data:[]};

const AllBlogs = () => {
    const [state,setState] = useState(initialState);
    const getData = async () => {
        try{
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!res.ok) throw new Error('failed to get data');
            const data = await res.json();
            setState(old => ({...initialState,data}));
        }catch(error){
            setState(old => ({...initialState,isError:error.message}));
        }
    }
    useEffect(() => {
        setState(old => ({...initialState,isLoading:true}));
        getData();
    },[]);
    if(state.isLoading) return <h1>Loading....</h1>
    if(state.isError) return <h1>{state.isError}</h1>
    return (
        <ul className="container">
            {state.data.map(item => {
                return (
                    <li key={item.id}><Link href={`/blogs/${item.id}`}>{`${item.id}) ${item.title}`}</Link></li>
                )
            })}
        </ul>
    )
}

export default AllBlogs;