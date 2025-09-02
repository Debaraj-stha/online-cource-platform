import React, { } from 'react'
import { levels } from '../constants/courses'
import capitalize from '../utils/string-func'
interface Props {
  sortBy?: string
  label?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FilterByLevel = ({ sortBy, onChange, label, className }: Props) => {

  return (
    <div>
      {
        label && <label htmlFor='lavel' className='block text-sm'>{label}</label>
      }
      <select
        value={sortBy}
        name='level'
        className={`${className ? className : "border-b-2 sm:border-b-0 "}`}
        onChange={onChange}

      >
        {
          levels.map((level) => (
            <option key={level} value={level}>{capitalize(level)}</option>

          ))
        }
      </select>
    </div>



  )
}

export default FilterByLevel
