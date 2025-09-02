import React, { } from 'react'
import { languages } from '../constants/courses'
import capitalize from '../utils/string-func'
interface Props {
  label?: string
  className?: string
  sortBy?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const FilterByLanguage = ({ label, className, sortBy, onChange }: Props) => {

  return (
    <div>
      {
        label && <label htmlFor='language'>{label}</label>
      }
      <select
        name='language'
        value={sortBy}
        className={`${className ? className : "border-b-2 sm:border-b-0 "}`}
        onChange={onChange}
      >
        {
          languages.map((language) => (
            <option key={language} value={language}>{capitalize(language)}</option>

          ))
        }
      </select>
    </div>

  )
}

export default FilterByLanguage
