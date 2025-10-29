import type { Category } from '../../@types/course'
import { categoryPrerequisites } from '../../constants/prerequisitesByCategory'

const SuggestedPrerequisites = ({ selectedCategory,onClick }: { selectedCategory: Category,onClick:(req:string)=>void }) => {
  return (
     <div>
        <h3 className="font-semibold">Prerequisites:</h3>
        <ul className="list-disc ml-5">
          {(categoryPrerequisites[selectedCategory]??[]).map(req => (
            <li key={req} onClick={()=>onClick(req)} className='cursor-pointer'>{req}</li>
          ))}
        </ul>
      </div>
  )
}

export default SuggestedPrerequisites


