import { useContext } from "react";
import { createContext } from "react"
import { authDataContext } from "./AuthConteext";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
    let [adminData, setAdminData] = useState("")
    let { serverUrl } = useContext(authDataContext)

    const getAdminData = async () => {
        try {
            let result = await axios.get(serverUrl + '/admin/getadmin',{ withCredentials: true })

            setAdminData(result.data)
        } catch (error) {
            setAdminData(null)
        }
    }

    let value = {
        serverUrl, adminData, setAdminData,getAdminData
    }

    useEffect(() => {
        getAdminData();
    }, [])


    return (
        <div>
            <adminDataContext.Provider value={value}>
                {children}
            </adminDataContext.Provider>
        </div>
    )
}

export default AdminContext
