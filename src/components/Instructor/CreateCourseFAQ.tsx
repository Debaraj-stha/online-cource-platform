import React, { useState } from 'react'
import type { CourseFAQ } from '../../@types/course'
import { CgAdd, CgClose } from 'react-icons/cg'
import Input from '../Input'

const CreateCourseFAQ = () => {
    const [faqs, setFaqs] = useState<CourseFAQ[]>([
        { answer: "", question: "", id: new Date().getTime().toString(), courseId: `demo-${new Date().getTime()}` }
    ])

    const addFaq = () => {
        setFaqs((prev) => ([...prev, { answer: "", question: "", id: new Date().getTime().toString(), courseId: `demo-${new Date().getTime()}` }]))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, faqid: string) => {
        const { value, name } = e.target
        setFaqs((prev) => (
            prev.map((m) => m.id === faqid ? {
                ...m,
                [name]: value
            } : m)
        ))
    }

    const removeFaq=(faqId:string)=>{
        setFaqs((prev)=>prev.filter((e)=>e.id!==faqId))
    }

    return (
        <div className='space-y-5 border-2 border-gray-500 p-4 rounded'>
            <h2 className='title'>FAQ</h2>
            {
                faqs.map((faq,) => (
                    <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5' key={faq.id}>
                        <Input
                            value={faq.question}
                            name='question'
                            placeholder='Question'
                            textColorClass='text-gray-100'
                            onChange={(e) => handleChange(e, faq.id)}
                        />
                        <Input
                            value={faq.answer}
                            onChange={(e) => handleChange(e, faq.id)}
                            name='answer'
                             textColorClass='text-gray-100'
                            placeholder='Answer'
                        />

                        <div>
                            <button title='Remove FAQ'
                                className='danger-button'
                                type='button'
                                onClick={()=>removeFaq(faq.id)}
                            >
                                <CgClose />
                            </button>
                        </div>
                    </div>

                )
                )
            }
            <button title='Add FAQ'
                className='primary-button'
                type='button'
                onClick={addFaq}
            >
                <CgAdd />
            </button>
        </div>
    )
}

export default CreateCourseFAQ
