import styles from './Input.module.scss'

type Proptype ={
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
}

const Input = (props: Proptype) =>{
    const {label, name, type, placeholder} = props;
    return(
         <div className={styles.container}>
           {label && <label htmlFor={name}>{label}</label>}
            <input name={name} id={name} type={type} placeholder={placeholder} className={styles.container__input} />
        </div>
    )
}

export default Input