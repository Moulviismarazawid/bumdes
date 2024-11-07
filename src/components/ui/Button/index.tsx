import styles from './Button.module.scss'

type Proptype = {
    type? : "submit" | "reset" | "button" | undefined,
    className?: string,
    onClick?: () => void,
    variant?: "primary" | "secondary",
    children: React.ReactNode
}

const Button = (props: Proptype) => {
    const {type, className, variant ='primary', children, onClick} = props
    return(
        <div >
            <button type={type} onClick={onClick} className={`${styles.button} ${className} ${styles[variant]}`}>{children}</button>
        </div>
    )
}

export default Button