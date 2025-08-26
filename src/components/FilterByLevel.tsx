import React, { useState } from 'react'
import { levels } from '../constants/courses'
import capitalize from '../utils/capitalize'

const FilterByLevel = () => {
      const [sortBy, setSortBy] = useState("beginner")
  return (

    <select
      value={sortBy}
      className='border-b-2 sm:border-b-0'
      onChange={e => setSortBy(e.target.value)}
    >
      {
        levels.map((level) => (
          <option key={level} value={level}>{capitalize(level)}</option>

        ))
      }
    </select>



  )
}

export default FilterByLevel
