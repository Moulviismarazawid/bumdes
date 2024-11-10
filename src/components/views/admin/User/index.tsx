/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layouts/AdminLayout"
import Button from "@/components/ui/Button";
import styles from "./User.module.scss";
import {  useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
    users : any
}

const UserAdminViews = (props: PropTypes) => {
    const [updatedUser, setUpdatedUser] = useState<any>({});
    const [deletedUser, setDeletedUser] = useState<any>({})
    const [usersData, setUsersData] = useState([]);
    const {users} = props;

    useEffect(() => {
        setUsersData(users)
    },[users])

    return (
        <>
        <AdminLayout>
            <div className={styles.user}>
                <h1>User Management</h1>
                <table className={styles.user__table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user: any, index: number) => (
                             <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className={styles.user__table__action}>
                                        <Button className={styles.user__table__action__edit} onClick={() => setUpdatedUser(user)} type="button"> <i className="bx bxs-edit"/></Button>
                                        <Button className={styles.user__table__action__delete} onClick={() => setDeletedUser(user)} type="button"> <i className="bx bxs-trash"/></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
        {Object.keys(updatedUser).length > 0 &&(
        <ModalUpdateUser updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} setUsersData={setUsersData}/>
        )}
        {Object.keys(deletedUser).length > 0 &&(
        <ModalDeleteUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUsersData={setUsersData}/>
        )}
        </>
    )
}

export default UserAdminViews