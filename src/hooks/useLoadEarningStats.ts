import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { getEarningStats } from "../store/reducers/instructorReducer"

const useLoadEarningStats = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const loadStats = useCallback(() => {
        useEffect(() => {
            (async () => {
                try {
                    setLoading(true)
                    await dispatch(getEarningStats())

                } finally {
                    setLoading(false)
                }
            })()

        }, [dispatch])
    }, [])
    return {
        loadStats,
        loading
    }

}
export default useLoadEarningStats