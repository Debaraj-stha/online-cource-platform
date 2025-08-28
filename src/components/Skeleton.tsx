import type { ReactNode } from "react"


const Skeleton = ({ extraClass, children }: { extraClass?: string; children?: ReactNode }) => {
  return (
    <div className={`bg-gray-500 rounded animate-pulse transition duration-200 opacity-70 ${extraClass}`}>
      {children}
    </div>
  )
}

export default Skeleton
