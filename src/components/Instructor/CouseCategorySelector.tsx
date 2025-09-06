import React from 'react'
import { categories } from '../../constants/courses'
interface Props {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  category?: string

}
const CouseCategorySelector: React.FC<Props> = ({ handleChange, category }) => {
  return (
    <div>
      <label className="block text-sm">Category</label>
      <select
        name="category"
        value={category || ""}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-700"
      >
        <option value="">Select category</option>
        {
          categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))
        }
      </select>
    </div>
  )
}

export default CouseCategorySelector
