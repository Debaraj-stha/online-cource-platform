import React from 'react'
import Input from '../Input'
import TagSuggestions from './TagSuggestions'

interface Props {
    tags?: string[]
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const CreateCourseTags = ({ tags = [], handleChange }: Props) => {
    const removeTag = (tagToDelete: string) => {
        // Flatten tags and remove selected one
        const allTags = tags.flatMap(tag => tag.split(",").map(t => t.trim()))
        const filtered = allTags.filter(t => t !== tagToDelete)

        // Call handleChange to update parent
        const event = {
            target: {
                name: "tags",
                value: filtered.join(","),
            },
        } as React.ChangeEvent<HTMLInputElement>

        handleChange?.(event)
    }
    const handleClick = (tag: string) => {
        const newTags = [...(tags || [])];
        //avoid duplication
        if (!newTags.includes(tag)) {
            newTags.push(tag)
        }

        const event = {
            target: {
                name: "tags",
                value: newTags.join(",")
            },
        } as React.ChangeEvent<HTMLInputElement>
        handleChange?.(event)
    }

    return (
        <div className="space-y-4">
            <h2 className='title'>Tags</h2>
            <div className="flex flex-wrap gap-3">
                {tags.map(t => t.trim()).
                    map(t => (
                        <span
                            key={t.trim()}
                            onClick={() => removeTag(t.trim())}
                            className="bg-gray-700 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors text-sm"
                        >
                            {t.trim()}
                        </span>
                    ))}

            </div>

            <Input
                type="text"
                name="tags"
                label="Tags"
                value={tags.join(",")}
                onChange={handleChange}
                placeholder="Enter tags separated by commas"
                textColorClass="text-gray-100"
            />
            <TagSuggestions selectedCategory="ai-ml" onClick={handleClick} />
        </div>
    )
}

export default CreateCourseTags
