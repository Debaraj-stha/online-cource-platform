import React from 'react'
import { CgList } from 'react-icons/cg'
import { GrGrid } from 'react-icons/gr'
import ThemeToggler from './ThemeToggler'
import LanguageSelector from './LanguageSelector'
import capitalize from '../utils/string-func'

const AppearanceSetting = () => {
    const fontSizes = [
        "normal",
        "large",
        "extra-large"
    ]
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <ul className="space-y-4 text-gray-300">
                <li className="flex justify-between items-center">
                    <span>Theme</span>
                    <ThemeToggler />
                </li>
                <LanguageSelector />
                <li>
                    <span>Font Size (Normal / Large / Extra Large)</span>
                    <div>
                        {
                            fontSizes.map((size) =>
                                <label key={size} className="flex gap-2 items-center cursor-pointer">
                                    <input type="radio" name="font-size" value={size} className="accent-blue-600" />
                                   {capitalize(size)}
                                </label>
                            )
                        }
                    </div>
                </li>
                <li>
                    <span className="block mb-2">Dashboard Layout</span>
                    <div className="flex gap-6">
                        <label className="flex gap-2 items-center cursor-pointer">
                            <input type="radio" name="layout" value="grid" className="accent-blue-600" />
                            <GrGrid /> Grid
                        </label>
                        <label className="flex gap-2 items-center cursor-pointer">
                            <input type="radio" name="layout" value="list" className="accent-blue-600" />
                            <CgList /> List
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default AppearanceSetting
