import {useState} from "react";

const useApiData = (initialState={}) => {
    const [apiData,setApiData] = useState({loading:false,errorMsg:null,data:initialState});
    const sendRequest = async (url,options={}) => {
        try{
            setApiData(old => ({...old,loading:true,errorMsg:null}));
            const res = await fetch(url,options);
            const data = await res.json();
            if(!res.ok) throw new Error(data?.message ?? 'Request failed!');
            setApiData(old => ({...old,data}));
            return data;
        }catch(error){
            setApiData(old => ({...old,errorMsg:error.message}));
        }finally{
            setApiData(old => ({...old,loading:false}));
        }
    }
    return {apiData,setApiData,sendRequest};
}

export default useApiData;