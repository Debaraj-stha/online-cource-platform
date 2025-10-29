import { type ReactNode } from 'react';

const GridWrapper = ({children,extraClass}:{children:ReactNode,extraClass?:string}) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 ${extraClass && extraClass}`}>
        {children}
        </div>
    )
}

export default GridWrapper
