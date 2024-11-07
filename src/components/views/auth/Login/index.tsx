import { useRouter } from 'next/router'
import styles from './Login.module.scss'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const LoginView = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {push, query} = useRouter();
    const callbackUrl : string = query.callbackUrl as string || '/';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setError('')
        const form = e.target as HTMLFormElement
        const data = {
            email: form.email.value,
            password: form.password.value
        }
        const result = await signIn('credentials', {
            redirect: false,
            ...data
        })
        if(result && !result.error){
            push(callbackUrl)
        }else{
            setIsLoading(false)
            setError('Invalid credentials')
        }
        //          try{
        //     const res = await signIn('credentials', {
        //         redirect: false,
        //         email: form.email.value,
        //         password: form.password.value,
        //         callbackUrl
        //     })
        //     if(!res?.error){
        //         setIsLoading(false)
        //         form.reset();
        //         push(callbackUrl)
        //     }else{
        //         setIsLoading(false)
        //         setError("Invalid email or password")
        //     }
        // }catch(error){
        //     setIsLoading(false)
        //     console.log(error)
        //     setError("Invalid email or password")
        // }
    }
    

    return(
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <Input label='Email' name='email' type='email'/>
                    <Input label='Password' name='password' type='password'/>
                    <Button type='submit' variant='primary' className={styles.login__button}>{isLoading ? 'Loading...' : 'Login'}</Button>
                </form>
                <hr className={styles.login__form__divider} />
                <Button type='button' variant='primary'  onClick={() => signIn('google', {callbackUrl, redirect: false})} className={styles.login__form__other__button}> <i className='bx bxl-google'></i> Login with Google</Button>
            </div>
                <p className={styles.login__link}>Don{"'"}t have an account? SignUp <Link href="/auth/register">here..</Link> </p>
        </div>
    )
}

export default LoginView