import React from 'react'
import Input from '../Input'
import SuggestedLearningPoints from './SuggestedLearningPoints'
import type { Category } from '../../@types/course'

interface Props {
    whatYouWillLearn?: string[]
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    selectedCategory: Category
}

const CreateWhatWillLearn = ({ whatYouWillLearn = [], handleChange, selectedCategory }: Props) => {

    const onClick = (point: string) => {
        const newPoints = [...whatYouWillLearn]

        if (!newPoints.includes(point)) {
            newPoints.push(point)
        }

        const event = {
            target: {
                name: "whatYouWillLearn",
                value: newPoints.join(",")
            }
        } as React.ChangeEvent<HTMLTextAreaElement>

        handleChange?.(event)
    }

    const handleRemove = (index: number) => {
        const filtered = whatYouWillLearn.filter((_, i) => i !== index)
        const event = {
            target: {
                name: "whatYouWillLearn",
                value: filtered.join(",")
            }
        } as React.ChangeEvent<HTMLTextAreaElement>

        handleChange?.(event)
    }


    return (
        <div className='space-y-4'>
            <h2 className="title">What you will learn?</h2>

            <ol className='list-decimal ml-5'>
                {whatYouWillLearn.map((point, index) => (
                    <li key={index} onClick={() => handleRemove(index)} className='cursor-pointer hover:text-blue-500 transition-colors'>{point}</li>
                ))}
            </ol>

            <Input
                type="text"
                value={whatYouWillLearn.join(",")}
                isTextArea={true}
                name="whatYouWillLearn"
                onChange={handleChange}
                textColorClass='text-gray-100'
                placeholder="What you will learn?"
            />

            <SuggestedLearningPoints selectedCategory={selectedCategory} onClick={onClick} />
        </div>
    )
}

export default CreateWhatWillLearn
