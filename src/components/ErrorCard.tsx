import React from 'react'
interface Props {
    error: string
}
const ErrorCard = (
    {
        error
    }: Props
) => {
    return (
        <div>
            <p className='text-red-500'>{error}</p>
        </div>
    )
}

export default ErrorCard
