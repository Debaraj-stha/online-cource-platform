import React, { memo, useState } from 'react'
import SortDropdown from '../components/SortDropdown';

import { BiExpandVertical } from 'react-icons/bi';
import AbsoluteCard from '../components/AbsoluteCard';


const FilterOptions = memo(() => {
    const [sortBy, setSortBy] = useState<string>("newest")
    const [open, setOpen] = useState(false)
    return (
        <div className='absolute right-0 top-3 z-50 p-1 bg-black text-center items-center'>
            <div
                onClick={() => setOpen(prev => !prev)}
                title='Show More'
                className={`hover:text-blue-400 transition-colors cursor-pointer ${open ? 'text-blue-400' : ''}`}
            >
                <BiExpandVertical size={20} />
            </div>
            {open && (
                <AbsoluteCard extraClass='top-32 z-50'>
                    <SortDropdown setSortBy={setSortBy} sortBy={sortBy} />
                </AbsoluteCard>
            )}
        </div>

    )
})

export default FilterOptions
