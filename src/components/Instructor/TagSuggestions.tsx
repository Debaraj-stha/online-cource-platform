import type { Category } from "../../@types/course";
import { categoryTags } from "../../constants/categoriesTags";


const TagSuggestions = ({ selectedCategory, onClick }: { selectedCategory: Category, onClick: (tag: string) => void }) => {
  return (
    <div className="space-y-3">
      <h3>Suggested tags for:{selectedCategory}</h3>
      <div className="flex flex-wrap gap-4">
        {categoryTags[selectedCategory].map(tag => (
          <span
            key={tag}
            onClick={() => onClick(tag)}
            className="bg-gray-200 px-2 py-1 text-gray-700 rounded cursor-pointer hover:bg-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
export default TagSuggestions