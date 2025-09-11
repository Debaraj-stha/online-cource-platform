import React from 'react'
import { SITE_NAME } from '../constants/common'
import logo from "../assets/images/logo.png"

const BrandLogo = ({ isHeader = false, textClass = "" }: { isHeader?: boolean, textClass?: string }) => {
    return (
        <div className="flex items-center gap-3 brand">
            <img
                src={logo}
                alt="coursely logo"
                className={`brand-logo rounded w-32 h-12 bg-gray-200  ${isHeader ? "hidden" : "sm:block"} sm:block`}
            />
            {/* <p className={`${isHeader ? " hidden sm:block" : ""} brand ${textClass}`}>{SITE_NAME}</p> */}
        </div>
    )
}

export default BrandLogo
