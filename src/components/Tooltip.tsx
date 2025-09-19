import React, { useRef, useState } from "react";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ content, children, position = "top" }: TooltipProps) => {
    const [visible, setVisible] = useState(false);
    const timerRef=useRef<NodeJS.Timeout|null>(null)

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };


    const handleEnter = () => {
        timerRef.current=setTimeout(() => {
            setVisible(true)
        }, 1000)
    }

    const handleLeave=()=>{
         setVisible(false)
         clearTimeout(timerRef?.current!)
    }

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {children}
            {visible && (
                <div
                    className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap ${positionClasses[position]}`}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
