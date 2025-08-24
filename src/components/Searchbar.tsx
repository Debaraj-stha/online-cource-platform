import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import gsap from 'gsap'

interface Props {
    placeholder?: string
    onMouseClick?: () => void,
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch?: () => void
}

const Searchbar = ({ placeholder = "Search here...", onMouseClick, onChange, onSearch, value }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showInput, setShowInput] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    let timer: ReturnType<typeof setTimeout> | null = null

    const startBlurTimer = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            inputRef.current!.blur()
            setShowInput(false)
            onMouseClick?.()
        }, 5000)
    }

    useEffect(() => {
        const input = inputRef.current
        if (!input) return




        const blurOnKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Enter" && onMouseClick) {
                onMouseClick()
                setShowInput(false)
                onSearch && onSearch()
            }
            startBlurTimer()
        }

        const blurOnClick = () => {
            startBlurTimer()
        }

        input.addEventListener('keyup', blurOnKeyUp)
        input.addEventListener('click', blurOnClick)

        return () => {
            if (timer) clearTimeout(timer)
            input.removeEventListener('keyup', blurOnKeyUp)
            input.removeEventListener('click', blurOnClick)
        }
    }, [onMouseClick])


    const handleSearchIconClick = () => {
        setShowInput(true)
        setTimeout(() => {
            inputRef.current?.focus()
            // Start the blur timer right after focus
            startBlurTimer()
        }, 100)
        onMouseClick?.()
    }


    useGSAP(() => {
        if (!showInput || !inputRef.current) return

        const input = inputRef.current

        gsap.set(input, { display: 'block', opacity: 0, width: 0 })

        gsap.to(input, {
            opacity: 1,
            width: '100%',
            duration: 0.8,
            ease: 'power2.out'
        })
    }, [showInput, onMouseClick])

    return (
        <div className='relative w-full md:w-auto'>
            <div
                className='absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer hover:bg-gray-800 p-1 rounded'
                onClick={handleSearchIconClick}
            >
                <BiSearchAlt size={20} 
                 className={`transition-colors duration-300 ${isFocused ? 'text-blue-400' : 'text-gray-300'}`}
                />
            </div>

            <input
                ref={inputRef}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
                type='text'
                name='search'
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    paddingLeft: "3rem",
                    borderRadius: "1.5rem",
                    display: showInput ? "block" : "none",
                    overflow: "hidden"
                }}
                className="input search-box"
            />
        </div>
    )
}

export default Searchbar
