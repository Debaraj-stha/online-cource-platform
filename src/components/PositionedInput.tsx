import { useState } from 'react';
type InputFieldType = "input" | "textarea"
interface Props {
    label: string;
    name: string;
    type?: string;
    as?: InputFieldType
}

const PositionedInput = ({ label, name, type = "text", as = "input" }: Props) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative my-4">
            {/* Input */}
            {
                as === "textarea" ?
                    <textarea
                        rows={4}
                        onFocus={() => setFocused(true)}
                        onBlur={(e) => setFocused(e.target.value !== "" ? true : false)}
                        className={`w-full px-3 pt-4 pb-2 font-semibold text-lg ${focused ? "ring-2 ring-blue-400" : "border border-gray-300"} rounded-md outline-none z-40 focus:ring-2 focus:ring-blue-500`}
                    ></textarea>
                    :
                    <input
                        id={name}
                        name={name}
                        type={type}
                        onFocus={() => setFocused(true)}
                        onBlur={(e) => setFocused(e.target.value !== "" ? true : false)}
                        className={`w-full px-3 pt-4 pb-2 font-semibold text-lg ${focused ? "ring-2 ring-blue-400" : "border border-gray-300"} rounded-md outline-none z-40 focus:ring-2 focus:ring-blue-500`}
                    />
            }

            {/* Label */}
            <label
                htmlFor={name}
                className={`absolute left-3 transition-all duration-200 pointer-events-none
          ${focused || false ? 'text-blue-500 text-sm top-0' : 'text-gray-400 top-3 text-base'}`}
            >
                {label}
            </label>
        </div>
    );
};

export default PositionedInput;
