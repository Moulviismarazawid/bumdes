import { useRouter } from 'next/router'
import styles from './Register.module.scss'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

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
        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

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
        <div className={styles.register}>
            <h1 className={styles.register__title}>Regiter</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <Input label='Email' name='email' type='email'/>
                    <Input label='Fullname' name='fullname' type='text'/>
                    <Input label='Phone Number' name='phone' type='number'/>
                    <Input label='Password' name='password' type='password'/>
                    <Button  type='submit' className={styles.register__button}>{isLoading ? 'Loading...' : 'Register'}</Button>
                </form>
            </div>
                    <p className={styles.register__link}>Have an account? Sign in <Link href="/auth/login">here..</Link> </p>
        </div>
    )
}

export default RegisterView