import { addData, retrieveDataByField } from '@/lib/firebase/service'
import bcrypt from 'bcrypt'


export async function signUp(userData:{
    email:string,
    fullName:string,
    phoneNumber:string,
    password:string,
    role?:string,
    createdAt?: Date,
    updatedAt?: Date
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
}, callback: Function){
    const data = await retrieveDataByField('users', 'email', userData.email)
    if(data.length > 0){
        callback(false)
    }else{
        if(!userData.role){
            userData.role = 'member'
        }
        userData.password = await bcrypt.hash(userData.password, 10)
        userData.createdAt = new Date()
        userData.updatedAt = new Date()
       addData('users', userData, (result:boolean) =>{
        callback(result)
       })
    }
}

export async function signIn(email:string){
    const data = await retrieveDataByField('users', 'email', email)

    if(data.length > 0){
        return data[0]
    }else{
        return null
    }
}

export async function loginWithGoogle(data:{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    id?:string,email:string, fullname:string, password:string, role:string, image:string,createdAt?: Date, updatedAt?: Date}, callback: Function){
    const user = await retrieveDataByField('users', 'email', data.email)
    if(user.length > 0){
        callback(user[0])
    }else{
        data.role = 'member';
        data.password = '';
        data.createdAt = new Date();
        data.updatedAt = new Date();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await addData('users', data, (status:boolean , res:any) =>{
            data.id = res.path.replace('users/','')
            if(status){
                callback(data)
            }
        })
    }

}
