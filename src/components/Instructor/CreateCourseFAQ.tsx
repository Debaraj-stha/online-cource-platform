import React from 'react';
import type { CourseFAQ } from '../../@types/course'
import { CgAdd, CgClose } from 'react-icons/cg'
import Input from '../Input'
import type { AppDispatch, RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addDynamicField, removeDynamicField, updateDynamicField } from '../../store/reducers/courseReducer'

const CreateCourseFAQ = () => {
    const dispatch = useDispatch<AppDispatch>()
    const faqs = useSelector((state: RootState) => state.course.course.faq)

    const addFaq = () => {
        dispatch(addDynamicField({
            field: "faq",
            value: {
                answer: "", question: "", id: new Date().getTime().toString(),
                courseId: `demo-${new Date().getTime()}`
            }
        }
        ))

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, faqid: string) => {
        const { value, name } = e.target
       dispatch(updateDynamicField({
        field:"faq",
        id:faqid,
        value:{[name]:value as Partial<CourseFAQ>}
       }))
    }

    const removeFaq = (faqId: string) => {
       dispatch(removeDynamicField({field:"faq",id:faqId}))
    }

    return (
        <div className='space-y-5 border-2 border-gray-500 p-4 rounded'>
            <h2 className='title'>FAQ</h2>
            {
                (faqs || []).map((faq: CourseFAQ) => (
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
                                onClick={() => removeFaq(faq.id)}
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
