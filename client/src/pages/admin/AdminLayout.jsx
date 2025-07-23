import React, { useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Loading from '../../components/Loading'

const AdminLayout = () => {

    const { isAdmin, fetchIsAdmin } = useAppContext()
    
    useEffect(() => {
        fetchIsAdmin()
    }, [])
 
    return isAdmin ? (
        <>
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
                    <Outlet /> {/* This is where the nested routes will be rendered */}
                </div>
            </div>
        </> 
    ) : <Loading />
}

export default AdminLayout