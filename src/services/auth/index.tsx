import instance from "@/lib/axios/instance";


const authServices = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerAccount: (data: any) => instance.post('/api/user/register', data),
}

export default authServices;