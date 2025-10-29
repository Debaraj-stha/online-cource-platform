import Skeleton from './Skeleton'

const CourseSkeleton = ({itemLength=5}:{itemLength?:number}) => {
    const now=Date.now()
    return (
        <>
            {Array.from({ length: itemLength }).map((_, i) => (
                <Skeleton key={now+i} extraClass='h-96 p-6 space-y-4 shadow-xl hover:opacity-80 cursor-pointer hover:scale-105'>
                    <Skeleton extraClass='bg-gray-600 z-50 w-full h-32' />
                    <Skeleton extraClass='bg-gray-600 z-50 w-64 h-7 ' />
                    <Skeleton extraClass='bg-gray-600 z-50 w-full h-7 ' />
                    <Skeleton extraClass='bg-gray-600 z-50 w-40 h-5 ' />
                    <Skeleton extraClass='bg-gray-600 z-50 w-24 h-5 ' />
                    <Skeleton extraClass='bg-gray-600 z-50 w-32 h-5 ' />
                </Skeleton>
            ))}
        </>
    )
}

export default CourseSkeleton
