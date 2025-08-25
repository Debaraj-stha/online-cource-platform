import React from 'react'
import { SITE_NAME } from '../constants/common'

const BrandLogo = ({isHeader=false}:{isHeader?:boolean}) => {
    return (
        <div className="flex items-center gap-3">
            <img
                src="https://images.icon-icons.com/2108/PNG/512/react_icon_130845.png"
                alt="Logo"
                className={`brand-logo ${isHeader ? "hidden" :"sm:block"} sm:block`}
            />
            <p className={`${isHeader ? " hidden sm:block":""} brand`}>{SITE_NAME}</p>
        </div>
    )
}

export default BrandLogo
