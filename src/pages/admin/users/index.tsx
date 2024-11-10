import UserAdminViews from "@/components/views/admin/User";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
    const [users , setUsers] = useState([]);
    useEffect(() => {
        const getAllUser = async () => {
            const data = await userServices.getAllUser();
            setUsers(data.data.data)
        }
        getAllUser();
    },[])
    return (
        <>
            <UserAdminViews users={users} />
        </>
    )
}

export default AdminUsersPage;