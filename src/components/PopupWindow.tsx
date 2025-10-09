import  { type ReactNode } from 'react'
import Modal from './Modal'

interface Props {
    children:ReactNode,
    animationClass?:string
}
const PopupWindow = ({children,animationClass="animate-slide-up animate-scale-up-down"}:Props) => {
    return (
        <Modal>
            <div className={`p-4 rounded  bg-white max-w-md ${animationClass} `}>
               {children}
            </div>
        </Modal>
    )
}

export default PopupWindow
