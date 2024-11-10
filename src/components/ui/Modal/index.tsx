import { useEffect, useRef } from 'react'
import styles from './Modal.module.scss'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = ({children, onClose}: {children: React.ReactNode, onClose: any}) =>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref: any = useRef()
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[onClose])
    return(
        <div className={styles.modal}>
            <div className={styles.modal__main} ref={ref}>{children}</div>
        </div>
    )
}

export default Modal;