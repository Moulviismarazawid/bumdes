import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import userServices from "@/services/user"
import styles from './ModalDeletedUser.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalDeleteUser = (props:any) => {
    const { deletedUser, setDeletedUser ,setUsersData} = props
    const handeleDeleteData = async () =>{
        userServices.deleteData(deletedUser.id); 
        setDeletedUser({});
        const {data} = await userServices.getAllUser()
        setUsersData(data.data)
    }
    return(
        <Modal onClose={() => setDeletedUser({})}>
            <h1 className={styles.modal__title}>Are You Sure..??</h1>
            <Button type="button" onClick={() => handeleDeleteData()}>Delete</Button>
        </Modal>
    )
}

export default ModalDeleteUser