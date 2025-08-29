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
}
const Input = ({ extraClass, type = "text", label, name, value, onChange, placeHolder, required = true, isTextArea = false }: Props) => {
    return (
        <>
            {
                label && <label htmlFor={`${name}`}>{label}</label>
            }
            {
                isTextArea ?
                    <textarea
                        placeholder={placeHolder}
                        name={name}
                        className={`w-full p-3 border rounded-lg h-32 resize-none text-gray-900  border-purple-600  outline-0  focus:ring-purple-700 focus:ring-2 ${extraClass && extraClass} `}
                        value={value}
                        onChange={onChange}
                        required={required}
                    />
                    :
                    <input
                        type={type}
                        placeholder={placeHolder}
                        className={`text-gray-900 p-3 border border-gray-700 rounded-lg outline-0  focus:ring-purple-700 focus:ring-2 ${extraClass && extraClass}`}
                        value={value}
                        name={name}
                        onChange={onChange}
                        required={required}
                    />
            }
        </>
    )
}

export default Input
