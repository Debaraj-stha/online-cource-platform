import React, { useState } from 'react'
import { languages } from '../constants/courses'
import capitalize from '../utils/string-func'

const FilterByLanguage = () => {
  const [sortBy, setSortBy] = useState("nepali")
  return (
    <select
      value={sortBy}
      className='border-b-2 sm:border-b-0'
      onChange={e => setSortBy(e.target.value)}
    >
      {
        languages.map((language) => (
          <option key={language} value={language}>{capitalize(language)}</option>

        ))
      }
    </select>
  )
}

export default FilterByLanguage
