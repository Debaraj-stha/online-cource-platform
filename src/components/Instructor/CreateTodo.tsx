import React, { useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'

interface Props {
    onClose?: () => void
}
const CreateTodo = ({ onClose }: Props) => {
    const [todo, setTodo] = useState("")
    return (
        <Modal
        // onClose={onClose}
        >
            <div className='rounded-xl bg-gray-100 px-10 py-6 w-xl space-y-4 sm:space-y-8'>
                <h3 className='title text-gray-800'>Create Todo</h3>
                <Input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    name='todo'
                    extraClass='w-full text-gray-800'
                    placeHolder='Type here...'
                />
                <div className=' flex gap-4'>
                    <button className='primary-button'>Add</button>
                    <button className='secondary-button'
                    onClick={onClose}
                    >Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTodo
