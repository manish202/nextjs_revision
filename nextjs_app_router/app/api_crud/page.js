'use client';
import { Suspense } from "react";
import {UserContextProvider} from "@/context/UserContext";
import UserTable from "@/components/api_crud/UserTable";
import UserFormModal from "@/components/api_crud/UserFormModal";
import UserViewModal from "@/components/api_crud/UserViewModal";
import DeleteModal from "@/components/api_crud/DeleteModal";

const ApiCRUDPage = () => {
    return (
        <UserContextProvider>
            <div className="min-h-screen bg-gray-100 p-6">
                <Suspense fallback={<p>Loading...</p>}>
                    <UserTable />
                </Suspense>
                <UserFormModal />
                <UserViewModal />
                <DeleteModal />
            </div>
        </UserContextProvider>
    );
}

export default ApiCRUDPage;