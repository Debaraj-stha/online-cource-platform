import esewa from "../assets/images/esewa_logo.png"
import khalti from "../assets/images/khalti.png"
import banktransfer from "../assets/images/bank-transfer.svg"
import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom";
import usePayment, { type InitProps } from "../hooks/usePayment"
import PaymentLoading from "../components/PaymentLoading"
import PaymentError from "../components/PaymentError"
import { TAX } from "../constants/common"
import BankDetails from "../components/BankDetails"
import DemoPaymentInfoCard from "../components/DemoPaymentInfoCard"

interface CardProps {
    image: string
    text: string
    onClick?: () => void
    extraText?: string
}

const Card = ({ image, text, onClick, extraText }: CardProps) => (
    <button
        onClick={onClick}
        aria-label={`Select ${text} as payment method`}
        className="flex items-center gap-3 border rounded-xl p-4 hover:bg-gray-100 transition w-full text-black text-left"
    >
        <img src={image} loading="lazy" alt={text} className="w-14 h-14 object-contain" />
        <div className="flex flex-col">
            <span className="font-medium">{text}</span>
            {extraText && <small className="text-sm text-gray-500">{extraText}</small>}
        </div>
    </button>
)

const Payment = () => {
    const [debugMode, setDebugMode] = useState(false)
    const [showBankDetails, setShowBankDetails] = useState(false)
    
    const location = useLocation()
    const state = location.state ?? {}

    const courseDetails = state.courseDetails
    const studentId=state.studentId;
    const courseId = state.courseId;
    if (!courseId || !studentId) return <Navigate to="/courses" replace /> //if not course found,then return to courses page

    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

    //  Hook to handle payments
    const { loading, error, payViaEsewa, payViaKhalti, selectedFile, pickInput, setSelectedFile, uploadRecipt } = usePayment({
        courseId,
        studentId,
        amount: (parseInt(courseDetails?.amount) + TAX - (courseDetails?.discount || 0)).toString(),
        discount: courseDetails?.discount,
        product_name: courseDetails?.name,
    })
    const return_url = `${FRONTEND_URL}/payment/success`

    const khaltoProps: InitProps = {
        amount_object: [
            {
                "label": "Course price",
                "amount": courseDetails.amount
            },
            {
                "label": "Tax",
                "amount": TAX,
            }
        ],
        customer_info: {
            "name": "Devraj shrestha",
            "phone": "9800000000",
            "email": "dstha221@gmail.com"
        },
        return_url: return_url,

    }

    const paymentMethods: CardProps[] = [
        { image: esewa, text: "E-sewa", onClick: () => payViaEsewa() },
        { image: khalti, text: "Khalti", onClick: () => payViaKhalti(khaltoProps) },
        {
            image: banktransfer,
            text: "Bank Transfer",
            onClick: () => setShowBankDetails(true),
        },
    ]

    if (loading) {
        return <PaymentLoading />
    }
    if (error) {
        return <PaymentError debugMode={debugMode} error={error} setDebugMode={setDebugMode} />
    }

    return (
        <div className="wrapper bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <DemoPaymentInfoCard />
                <div className="bg-white rounded-2xl px-6 py-8 space-y-6 sm:my-20 shadow flex flex-col md:flex-row gap-6">
                    {/*  Show Course & Payment Details */}
                    {courseDetails && (
                        <div className="border-b pb-4 mb-6">
                            <h3 className="text-2xl font-bold text-gray-700 ">Payment Details</h3>
                            <div className="mt-4 space-y-3 text-gray-600">
                                <p><span className="font-medium">Course:</span> {courseDetails.name}</p>
                                <p><span className="font-medium">Amount:</span> Rs. {courseDetails.amount}</p>
                                {courseDetails.discount > 0 && (
                                    <p>
                                        <span className="font-medium">Discount:</span> Rs. {courseDetails.discount}
                                        {courseDetails.discountReason && (
                                            <span className="text-sm text-gray-500"> ({courseDetails.discountReason})</span>
                                        )}
                                    </p>
                                )}
                                <p className="font-bold text-gray-800">
                                    Total: Rs. {courseDetails.amount - (courseDetails.discount || 0)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/*  Payment Options */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 ">Choose Payment Method</h3>
                        {paymentMethods.map((method, idx) => (
                            <Card key={idx} {...method} />
                        ))}
                    </div>
                </div>

                {showBankDetails && (
                    <BankDetails onUpload={pickInput} />
                )}
                {selectedFile && (
                    <div className="mt-4 border rounded-lg p-4 bg-white shadow space-y-4">
                        <h4 className="font-medium text-gray-700 mb-2">Receipt Preview:</h4>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected Receipt"
                            className="max-w-full max-h-96 object-contain rounded-md border"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  ">
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="mt-2 text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => uploadRecipt(`${return_url}?method=bank`)}
                                className="primary-button"
                            >
                                Upload
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default Payment
