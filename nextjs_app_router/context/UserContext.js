import {useState,createContext,useContext} from "react";

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [modal,setModal] = useState({type:null,user:null});
    const [reloadTable,setReloadTable] = useState(true);
    const toggleModel = (type,user) => setModal(old => ({...old,type,user}));
    const reloadTblNow = () => setReloadTable(old => !old);
    return (
        <UserContext.Provider value={{modal,toggleModel,reloadTable,reloadTblNow}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}