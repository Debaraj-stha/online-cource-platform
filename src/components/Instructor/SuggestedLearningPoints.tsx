import type { Category } from "../../@types/course"
import { categoryLearningPoints } from "../../constants/CategoryLearningPoints"


const SuggestedLearningPoints = ({ selectedCategory, onClick }: { selectedCategory: Category, onClick: (point: string) => void }) => {
  return (
    <div>
      <h3 className="font-semibold">What You Will Learn:</h3>
      <ul className="list-disc ml-5">
        {categoryLearningPoints[selectedCategory].map(point => (
          <li
            key={point}
            className="cursor-pointer hover:text-blue-600"
            onClick={() => onClick(point)}
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SuggestedLearningPoints
