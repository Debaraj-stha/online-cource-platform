import { useRef, useState } from 'react';
import { FaChartLine, FaPen, FaPlus } from 'react-icons/fa'
import CreateTodo from './CreateTodo'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const QuickActions = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const actions = [
        {
            text: " Edit Profile",
            icon: <FaPen />,
            bg: "bg-purple-600 hover:bg-purple-700",
            onClick: () => {
                navigate("/profile/edit/")
            }
        },
        {
            text: "View Reports",
            icon: <FaChartLine />,
            bg: " bg-blue-600 hover:bg-blue-700",
            onClick: () => {
                navigate("/instructor/reports/")
            }
        },
        {
            text: "Create Todo",
            icon: <FaPlus />,
            bg: " bg-green-600 hover:bg-green-700",
            onClick: () => {
                setModalOpen(true)
            }
        },

    ]
    const ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!ref.current) return
        gsap.from("button", {
            opacity: 0,
            y: 40,
            ease: "power1.inOut",
            stagger: 0.1,
            duration: 0.4,
        })
    }, { scope: ref })

    return (
        <>
            <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex gap-4" ref={ref}>
                    {
                        actions.map((action) => (
                            <button
                                onClick={action.onClick}
                                className={`flex items-center gap-2px-4 py-2 rounded-lg  ${action.bg}`}>
                                {action.icon} {action.text}
                            </button>
                        ))
                    }
                </div>
            </div>
            {
                modalOpen && <CreateTodo
                    onClose={() => setModalOpen(false)}
                />
            }
        </>
    )
}

export default QuickActions
