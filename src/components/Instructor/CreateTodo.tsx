import React, { useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { addTodo, setTodo } from '../../store/reducers/instructorReducer'

interface Props {
    onClose?: () => void
}
const CreateTodo = ({ onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const { todo } = useSelector((state: RootState) => state.instructor)
    const [adding, setAdding] = useState(false)

    const handleAdd = async () => {
        try {
            setAdding(true)
            await dispatch(addTodo(todo.title))
        } finally {
            setAdding(false)
            onClose?.()
        }
    }



    return (
        <Modal
        // onClose={onClose}
        >
            <div className='rounded-xl bg-gray-100 px-10 py-6 w-xl space-y-4 sm:space-y-8'>
                <h3 className='title text-gray-800'>Create Todo</h3>
                <Input
                    value={todo.title}
                    onChange={(e) => dispatch(setTodo(e.target.value))}
                    name='todo'
                    extraClass='w-full text-gray-800'
                    placeholder='Type here...'
                />
                <div className=' flex gap-4'>
                    <button className='primary-button' disabled={adding}
                        onClick={handleAdd}
                    >Add</button>
                    <button className='secondary-button'
                        onClick={onClose}
                    >Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTodo
