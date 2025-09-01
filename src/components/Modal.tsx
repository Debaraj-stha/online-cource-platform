import React, { type ReactNode } from 'react'

const Modal = ({ children ,extraClass,onClose}: { children: ReactNode ,extraClass?:string,onClose?:()=>void}) => {
    return (
        <div
        onClick={onClose}
        title='Close'
        className={`fixed inset-0 flex items-start py-32 px-8  overflow-hidden
         md:items-center justify-center  opacity-95 bg-gray-900 hover:bg-gray-800 transition-colors ${extraClass && extraClass}`}>
            {children}
        </div>
    )
}

export default Modal
