import React from 'react'
import gif from "../assets/videos/not-found.gif"

const NotFound = () => {
    return (
        <div className='wrapper '>
            <div className='w-7xl h-full mx-auto flex  sm:justify-center sm:items-center'>
                <img src={gif} loading='lazy' alt='page not foound' className='object-cover' />
            </div>
        </div>
    )
}

export default NotFound
