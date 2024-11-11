import instance from "@/lib/axios/instance";

const userServices ={
    getAllUser: () => instance.get('/api/user'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUser: (id: string, data:any,token:string) => instance.put(`/api/user/${id}`,{data},{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }),
    deleteUser: (id: string,token:string ) => instance.delete(`/api/user/${id}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export default userServices