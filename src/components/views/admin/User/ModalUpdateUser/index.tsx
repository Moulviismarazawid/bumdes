import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalUpdateUser = (props: any) => {
    const { updatedUser, setUpdatedUser , setUsersData} = props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session:any = useSession();
    const [isLoading, setIsLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const form: any = e.target as HTMLFormElement
        const data = {
            role: form.role.value,
        }
        const result = await userServices.updateUser(updatedUser.id, data, session.data?.accessToken)

        if(result.status === 200){
            form.reset()
            setIsLoading(false)
            setUpdatedUser({})
            const {data} = await userServices.getAllUser()
            setUsersData(data.data)
        }else{
            setIsLoading(false)
        }
    }
    return (
        <>
        <Modal onClose={() => setUpdatedUser({})}>
          <form onSubmit={handleUpdate}>
              <h1>Update User</h1>
            <Input label='Email' name='email' type='email' defaultValue={updatedUser.email} disabled/>
            <Input label='Fullname' name='fullname' type='text' defaultValue={updatedUser.fullname} disabled/>
            <Input label='Phone Number' name='phone' type='number' defaultValue={updatedUser.phone} disabled/>
            <Select defaultValue={updatedUser.role} name='role' label='Role' options={[{label: 'Admin', value: 'admin'}, {label: 'Member', value: 'member'}]} />
            <Button type="submit">{isLoading ? 'Loading...' : 'Update'}</Button>
          </form>
        </Modal>
        </>
    )
}

export default ModalUpdateUser;