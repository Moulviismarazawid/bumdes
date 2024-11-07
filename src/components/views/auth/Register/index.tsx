import { useRouter } from 'next/router'
import styles from './Register.module.scss'
import { FormEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import authServices from '@/services/auth'
import AuthLayout from '@/components/layouts/AuthLayout'

const RegisterView = () =>{
    const {push} = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setError('')
        const form = e.target as HTMLFormElement
        const data = {
            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value
        }
        const result = await authServices.registerAccount(data)

        if(result.status === 200){
            form.reset()
            setIsLoading(false)
            push('/auth/login')
        }else{
            setIsLoading(false)
            setError('email already exists')
        }
    }
    

    return(
        <AuthLayout error={error} title='Register' link='/auth/login' linkText='Have an account? Sign in '>
            <form onSubmit={handleSubmit}>
                <Input label='Email' name='email' type='email'/>
                <Input label='Fullname' name='fullname' type='text'/>
                <Input label='Phone Number' name='phone' type='number'/>
                <Input label='Password' name='password' type='password'/>
                <Button  type='submit' className={styles.register__button}>{isLoading ? 'Loading...' : 'Register'}</Button>
            </form>
        </AuthLayout>
    )
}

export default RegisterView