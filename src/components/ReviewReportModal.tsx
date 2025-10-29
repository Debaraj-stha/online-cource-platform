import { useState } from 'react';
import Input from './Input'
import Modal from './Modal'
import type { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'
import { reportToReview } from '../store/reducers/courseReducer'
interface Props {
    onClose: () => void
    reviewId: string
    courseId: string
}
const ReviewReportModal = ({ reviewId, courseId, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [reason, setReason] = useState("")
    const [isReporting, setReporting] = useState(false)
    const [error, setError] = useState("")

    const reportReview = async () => {
        try {
            setReporting(true)
            const result = await dispatch(reportToReview({ courseId, reviewId: reviewId, reason }))
            if (reportToReview.rejected.match(result)) {
                setError("Something went wrong while  reporting to review")
            }
        } finally {
            setReporting(false)
            onClose()
        }
    }
    return (
        <Modal>
            <div className='bg-gray-100 rounded-xl w-2xl p-6 space-y-5'>
                <Input
                    name='reason'
                    placeholder='Report Reson here...'
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                    isTextArea={true}
                />
                <div className='flex gap-4'>
                    <button
                        title='Report'
                        disabled={isReporting}
                        onClick={reportReview}
                        className='bg-purple-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors
            hover:bg-purple-500 rounded
            '>Report</button>
                    <button
                        title='Cancel'
                        onClick={() => onClose()}
                        className='bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors
            hover:bg-gray-500 rounded
            '>Cancel</button>
                </div>
            </div>
            {
                error && <p className='text-red-600 mt-2'>{error}</p>
            }
        </Modal>

    )
}

export default ReviewReportModal
