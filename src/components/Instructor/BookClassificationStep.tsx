import React from 'react'
import CouseCategorySelector from './CouseCategorySelector'
import FilterByLevel from '../FilterByLevel'
import FilterByLanguage from '../FilterByLanguage'
import StepControlButton from './StepControlButton'
import type { Category, Language, Level } from '../../@types/course'

interface Props {
    handleChange?:(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void
    onPrevious?: () => void
    onNext?: () => void,
    category:Category,
    level:Level,
    language:Language
}
const BookClassificationStep = ({ onNext, onPrevious, handleChange,category,language,level}: Props) => {

    return (
        <>
            <h2 className='title'>Classification</h2>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <CouseCategorySelector  handleChange ={handleChange} category={category}/>
                <FilterByLevel sortBy={level} onChange={handleChange} label="Level"  className="w-full p-2 rounded border border-gray-700" />
                <FilterByLanguage sortBy={language}  onChange={handleChange} label="Language" className="w-full p-2 rounded border border-gray-700" />
                <div className='col-span-2'>
                    <StepControlButton onNext={onNext} onPrevious={onPrevious} />
                </div>
            </div>
        </>
    )
}

export default BookClassificationStep
