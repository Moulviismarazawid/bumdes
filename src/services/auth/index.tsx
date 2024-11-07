import instance from "@/lib/axios/instance";


const authServices = {
    registerAccount: (data: unknown) => instance.post('/api/user/register', data),
}

export default authServices;