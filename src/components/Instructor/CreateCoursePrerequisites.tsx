import React from 'react'
import Input from '../Input'
import SuggestedPrerequisites from './SuggestedPrerequisites'
interface Props {
    prerequisites?: string[]
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CreateCoursePrerequisites = ({ handleChange, prerequisites }: Props) => {
    
    const onClick = (prerequisite: string) => {
        console.log(prerequisite)
    const newPrerequisites = [...(prerequisites || [])]
    if (!newPrerequisites.includes(prerequisite)) {
        newPrerequisites.push(prerequisite)
    }
    const event = {
        target: {
            name: "prerequisites",
            value: newPrerequisites.join(",")
        }
    } as React.ChangeEvent<HTMLTextAreaElement>
    handleChange?.(event)
}

const removePrerequisites=(index:number)=>{
    const filtered=prerequisites?.filter((_,i)=>i!==index)
    
     const event = {
        target: {
            name: "prerequisites",
            value: filtered?.join(",")
        }
    } as React.ChangeEvent<HTMLTextAreaElement>
    handleChange?.(event)


}
    const displayPrerequisites = prerequisites?.map(t => t.trim());


    return (
        <div className="space-y-4">
            <h2 className="title">Prequisites</h2>
            <ul className="list-disc ml-5">
                {displayPrerequisites?.map((req, index) => (
                    <li key={index} onClick={()=>removePrerequisites(index)} className='cursor-pointer transition-colors hover:text-blue-500 '>{req}</li>
                ))}
            </ul>
            <Input
                value={prerequisites?.join(",")}
                name="prerequisites"
                onChange={handleChange}
                textColorClass='text-gray-100'
                isTextArea={true}
                placeholder="Prerequisites"
            />
            <SuggestedPrerequisites selectedCategory='ai-ml' onClick={onClick} />

        </div>
    )
}

export default CreateCoursePrerequisites
