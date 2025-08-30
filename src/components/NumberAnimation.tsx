import React, { useEffect, useState } from 'react'

const NumberAnimation = ({ duration = 300, target = 200,extraText="" }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        const startTimer = performance.now()
        const animater = (updateTimer: number) => {
            const elapsedTime = updateTimer - startTimer
            const progress = Math.min(1, elapsedTime / duration)
            const newValue = Math.floor(progress * target)
            setCount(newValue)
            if (progress < 1)
                requestAnimationFrame(animater)
        }
        requestAnimationFrame(animater)
    }, [duration, target])
    return (

        <span>{count}{extraText}</span>

    )
}

export default NumberAnimation
