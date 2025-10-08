import React, { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { setReview, updateReview, setReviewFieldValue } from "../store/reducers/courseReducer"
import Input from "./Input"
import Modal from "./Modal"
import { setMessageWithTimeout, type Message } from "../store/reducers/messageReducer"
import type { ReviewEditableField } from "../store/reducer-types/course"
import { useNavigate } from "react-router-dom"
import { removeCookie } from "../utils/manage-cookie"
import { setPendingAction, type PendingAction } from "../store/reducers/pendingActionReducer"

interface Props {
  review: any
  onClose: () => void
  courseId: string
}

const EditReviewModal = ({ review: oldReview, onClose, courseId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const  navigate=useNavigate()
  const [processing, setProcessing] = useState(false)
  //fetching updated review from state
  const review = useSelector((state: RootState) => state.course.review)
  // const {actions}=useSelector((state:RootState)=>state.pendingAction)



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target
    dispatch(setReviewFieldValue({ field: name as keyof ReviewEditableField, value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setProcessing(true)
      console.log(review)
      const result = await dispatch(updateReview({ courseId, reviewId: review.id!, review: review }))

      if (updateReview.fulfilled.match(result)) {
        onClose()
      }
      else if (updateReview.rejected.match(result)) {
        const message: Message = {
          type: "error",
          id: Date.now(),
          messages: result.error.message! || "Something went wrong"
        };
        (dispatch as AppDispatch)(setMessageWithTimeout(message))
      }
      console.log(result.payload)
      if(result.payload==="Token is not valid"){
        const action:PendingAction={
          args:{courseId, reviewId: review.id!, review: review},
          method: updateReview,
          type:"redux"
        }
        dispatch(setPendingAction(action))
        const from =`/courses/${courseId}`
        navigate("/auth/login/",{state:{from}})
      }
     
    } catch (error) {

    } finally {
      setProcessing(false)
    }
  }

  useEffect(() => {
    //storing old review in state as without state it will not reflect updated value on UI
    dispatch(setReview(oldReview))
  }, [oldReview])

  return (
    <Modal>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Your Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Review Text */}
          <Input
            isTextArea
            name="review"
            onChange={handleChange}
            value={review.review}
            placeholder="Update your review..."
          />

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => dispatch(setReviewFieldValue({ field: "rating", value: star }))}
              />
            ))}
          </div>

          {/* Anonymous checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={review.anonymous}
              onChange={(e) => dispatch(setReviewFieldValue({ field: "anonymous", value: e.target.checked }))}
            />
            <label htmlFor="anonymous" className="text-gray-700">
              Anonymous
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditReviewModal
