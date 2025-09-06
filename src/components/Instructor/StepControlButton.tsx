import React from 'react'
interface Props{
    onPrevious?:()=>void
    onNext?:()=>void
    disabled?:boolean
}
const StepControlButton = ({onNext,onPrevious,disabled}:Props) => {
    return (
        <div className='gap-4 flex items-center'>
            <button  onClick={onPrevious} className='primary-button'>Previous</button>
            <button  onClick={onNext} disabled={disabled} className='primary-button disabled:opacity-50 disabled:cursor-not-allowed'>Next</button>
        </div>
    )
}

export default StepControlButton
