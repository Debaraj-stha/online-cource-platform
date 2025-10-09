import  { type ReactNode } from 'react'

const AbsoluteCard = ({children,extraClass,onClick}:{children:ReactNode,extraClass?:string,onClick?:()=>void}) => {{}
  return (
    <div onClick={onClick} className={`absolute px-3 py-6 rounded shadow hover:shadow-2xl top-1/2 -translate-y-1/2 bg-gray-800 right-0 ${extraClass}`}>
      {children}
    </div>
  )
}

export default AbsoluteCard
