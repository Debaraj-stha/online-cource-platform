
import FilterByLanguage from "./FilterByLanguage";
import FilterByLevel from "./FilterByLevel";

interface Props {
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
}
const SortDropdown = ({ sortBy, setSortBy }: Props) => {
    return (
        <div className="flex gap-5 flex-col">
            <FilterByLevel />

            <FilterByLanguage />
            <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
            >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    )
}

export default SortDropdown
