import React from 'react'
import CouseCategorySelector from './CouseCategorySelector'
import FilterByLevel from '../FilterByLevel'
import FilterByLanguage from '../FilterByLanguage'
import StepControlButton from './StepControlButton'
interface Props {

    onPrevious?: () => void
    onNext?: () => void
}
const BookClassificationStep = ({ onNext, onPrevious }: Props) => {
    return (
        <>
            <h2 className='title'>Classification</h2>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <CouseCategorySelector />
                <FilterByLevel label="Level" className="w-full p-2 rounded border border-gray-700" />
                <FilterByLanguage label="Language" className="w-full p-2 rounded border border-gray-700" />
                <div className='col-span-2'>
                    <StepControlButton onNext={onNext} onPrevious={onPrevious} />
                </div>
            </div>
        </>
    )
}

export default BookClassificationStep
