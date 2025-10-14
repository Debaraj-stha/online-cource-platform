import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react'
import { FaTasks } from 'react-icons/fa';
import gsap from 'gsap';
import Skeleton from '../Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { clearTodo, deleteTodo, getTodos, setTodo } from '../../store/reducers/instructorReducer';
import CreateTodo from './CreateTodo';

const Tasks = () => {
  const todos = useSelector((state: RootState) => state.instructor.todos)
  const ref = useRef<HTMLUListElement>(null)
  const [isDeleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [editTodoId, setEditTodoId] = useState<string | null>(null)


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        await dispatch(getTodos())

      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [dispatch])


  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    if (!ref.current) return
    gsap.from(".task", {
      opacity: 0,
      y: 40,
      ease: "power1.inOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        scrub: true,
        end: "top 50%",
        toggleActions: "play none none reverse"
      }

    })
  }, { scope: ref })




  const handleDelete = async (id: string) => {
    try {
      setDeleting(true)
      await dispatch(deleteTodo(id))
    } finally {
      setDeleting(false)
    }
  }





  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaTasks /> To-Do
      </h3>
      {
        loading ?
          <ul className='space-y-4'>
            {
              Array.from({ length: 5 }).map((_, index) => (

                <Skeleton key={index} extraClass={`h-7 ${index % 2 === 0 ? "w-md" : index % 3 === 0 ? "w-2xl" : "w-xl"}`} />

              ))
            }
          </ul>
          : todos.length == 0 ?
            <div className='flex justify-center items-center'>
              <p className='text-center '>No todos are available to show</p>
            </div>
            :
            <ul className="space-y-3" ref={ref}>
              {todos.map((task, index) => (
                <li
                  key={task._id ?? index}
                  className="p-3 bg-gray-700 rounded-lg flex items-center justify-between text-sm task"
                >
                  {index + 1}. {task.title}
                  <div className='flex gap-4'>
                    <button
                      title='Mark as done'
                      className="text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                      disabled={isDeleting}
                      onClick={() => handleDelete(task._id!)}
                    >
                      Mark Done
                    </button>
                    <button
                      title='Edit todo'
                      className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"

                      onClick={() => {
                        setEditTodoId(task._id!)
                        dispatch(setTodo(task))
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
      }
      {
        editTodoId != null && <CreateTodo onClose={() => {
          setEditTodoId(null);
          dispatch(clearTodo())

        }}
          isEditMode={true}
        />
      }
    </div>
  )
}

export default Tasks
