import React, { type ReactNode } from 'react'

const Modal = ({ children }: { children: ReactNode }) => {
    return (
        <div className='fixed inset-0 flex items-start py-32 px-8 md:px-0 md:py-0 overflow-hidden md:items-center justify-center  opacity-95 bg-gray-900'>
            {children}
        </div>
    )
}

export default Modal
