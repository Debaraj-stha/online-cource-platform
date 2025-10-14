import { useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import { useDispatch, useSelector, } from 'react-redux'
import type { AppDispatch, RootState, } from '../../store/store'
import { addTodo, setTodoTitle, updateTodo } from '../../store/reducers/instructorReducer'


interface Props {
    onClose?: () => void,
    isEditMode?: boolean

}
const CreateTodo = ({ onClose, isEditMode = false }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [adding, setAdding] = useState(false)
    const todo = useSelector((state: RootState) => state.instructor.todo)

    const handleAddUpdate = async () => {
        try {
            setAdding(true)
            if (isEditMode) await dispatch(updateTodo({ id: todo._id!, title: todo.title }))
            else await dispatch(addTodo(todo.title))
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
                    onChange={(e) => dispatch(setTodoTitle(e.target.value))}
                    name='todo'
                    extraClass='w-full text-gray-800'
                    placeholder='Type here...'
                />
                <div className=' flex gap-4'>
                    <button className='primary-button' disabled={adding}
                        onClick={handleAddUpdate}
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
