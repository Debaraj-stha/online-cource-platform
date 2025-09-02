import React from 'react'
type InputType = "text" | "password" | "email"
interface Props {
    extraClass?: string,
    type?: InputType,
    label?: string,
    name: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    placeHolder?: string,
    required?: boolean
    isTextArea?: boolean
    textColorClass?: string
}
const Input = ({ extraClass, type = "text", label, name, value, onChange, placeHolder, required = true, isTextArea = false, textColorClass = "text-gray-900" }: Props) => {
    return (
        <div className='space-y-3 input-card'>
            {
                label && <label htmlFor={`${name}`}>{label}</label>
            }
            {
                isTextArea ?
                    <textarea
                        placeholder={placeHolder}
                        name={name}
                        className={`w-full placeholder-gray-400 p-3 border rounded-lg h-32 resize-none  border-gray-700  outline-0  focus:ring-purple-700 focus:ring-2 ${extraClass && extraClass} ${textColorClass}`}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                    :
                    <input
                        type={type}
                        placeholder={placeHolder}
                        className={`w-full placeholder-gray-400  p-3 border border-gray-700 rounded-lg outline-0  focus:ring-purple-700 focus:ring-2 ${textColorClass} ${extraClass && extraClass}`}
                        value={value}
                        name={name}
                        onChange={onChange}
                        required={required}
                    />
            }
        </div>
    )
}

export default Input
