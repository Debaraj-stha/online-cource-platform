import { useGSAP } from '@gsap/react'
import { memo, useEffect, useRef, useState } from 'react'
import { BiArrowBack, BiSearchAlt } from 'react-icons/bi'
import gsap from 'gsap'

interface Props {
    placeholder?: string
    onMouseClick?: () => void,
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch?: () => void
    onBack?: () => void
}

const Searchbar =memo(({ placeholder = "Search here...", onMouseClick, onChange, onSearch, value, onBack }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showInput, setShowInput] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const hasAnimatedRef = useRef(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)


    const startBlurTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            inputRef.current?.blur()
            setShowInput(false)
            gsap.set(inputRef.current, { display: 'block', opacity: 1, width:"100%" })
            onBack?.()
        }, 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        onChange?.(e)
    }



    useEffect(() => {
        const input = inputRef.current
        if (!input) return

        const blurOnKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Enter" && onMouseClick) {
                onBack?.()
                setShowInput(false)
                onSearch && onSearch()
            }
            startBlurTimer()
        }

        const blurOnClick = () => {
            startBlurTimer()

        }

        input.addEventListener('keyup', blurOnKeyUp)
        input.addEventListener('click', blurOnClick, { once: true })

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            input.removeEventListener('keyup', blurOnKeyUp)
            input.removeEventListener('click', blurOnClick)
        }
    }, [onMouseClick])




    useGSAP(() => {
        if (!showInput || !inputRef.current || hasAnimatedRef.current) return

        const input = inputRef.current
        gsap.set(input, { display: 'block', opacity: 0, width: 0 })
        gsap.to(input, {
            opacity: 1,
            width: '100%',
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                hasAnimatedRef.current = true
            }
        })
    }, [showInput])




    const handleSearchIconClick = () => {
        // If there's a value, treat it as a search submit
        if (value?.trim()) {
            console.log("searching...")
            setShowInput(false)
            setIsFocused(false)
            onSearch?.()
            hasAnimatedRef.current = false
            return //  Exit early — don't toggle show/hide via onMouseClick
        }

        // Otherwise just open the search input
        setShowInput(true)
        setTimeout(() => {
            inputRef.current?.focus()
            startBlurTimer()
        }, 100)

        onMouseClick?.()
    }


    const handleBack = () => {
        setShowInput(false)
        hasAnimatedRef.current = false
        gsap.set(inputRef.current, { display: 'none', opacity: 0, width: 0 })
        onBack?.()
    }





    return (
        <div className='w-full flex flex-row gap-3 relative'>

            <div className={`px-0 py-0 items-center ${showInput ? "flex" : "hidden"} md:hidden`} onClick={handleBack}>
                <BiArrowBack />
            </div>
            <div className='relative w-full'>
                <div
                    title='Search'
                    className={`absolute  top-1/2 -translate-y-1/2  ${showInput? "right-0 md:left-3" :""}    md:left-3  
                         cursor-pointer p-1 rounded`}
                    onClick={handleSearchIconClick}
                >

                    <BiSearchAlt size={20}
                        className={`transition-colors duration-300 ${isFocused ? 'text-blue-400' : 'text-gray-300'}`}
                    />
                </div>

                <input
                    ref={inputRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    type='text'
                    name='search'
                    value={value ?? ""}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={{

                        borderRadius: "1.5rem",
                        overflow: "hidden"
                    }}
                    // always shows on large devices but show/hide based on state in small and medium 
                    className={`input search-box  pl-4  pr-10 md:pr-4  md:pl-10 text-blue-400 ${showInput ? "block" : ""} md:block`}
                />
            </div>

        </div>
    )
})

export default Searchbar
