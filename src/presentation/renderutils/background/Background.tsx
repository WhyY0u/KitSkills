import type { ReactNode } from 'react'
import styles from './style/Style.module.css'
interface BackgroundProps {
    children: ReactNode;
}
const Background = ({ children }: BackgroundProps) => {
    return <>
        <div className={`${styles.background}`}>
            {children}
        </div>
    </>
}


export default Background;