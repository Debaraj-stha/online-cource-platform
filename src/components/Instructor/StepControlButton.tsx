import React from 'react'
interface Props{
    onPrevious?:()=>void
    onNext?:()=>void
}
const StepControlButton = ({onNext,onPrevious}:Props) => {
    return (
        <div className='gap-4 flex items-center'>
            <button  onClick={onPrevious} className='primary-button'>Previous</button>
            <button  onClick={onNext} className='primary-button'>Next</button>
        </div>
    )
}

export default StepControlButton
