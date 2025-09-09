import React, { type SetStateAction } from 'react'
interface Props{
    paymentData:any
    debugMode:boolean
    setDebugMode:React.Dispatch<SetStateAction<boolean>>
}
const PaymentDebugCard = ({paymentData,debugMode,setDebugMode}:Props) => {
  return (
     <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Debug Information</h3>
              <button
                onClick={() => setDebugMode(!debugMode)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {debugMode ? "Disable Debug" : "Enable Debug"}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p><span className="font-medium">Transaction ID:</span> {paymentData.transaction_uuid}</p>
              <p><span className="font-medium">Product Code:</span> {paymentData.product_code}</p>
              <p><span className="font-medium">Amount:</span> {paymentData.amount || paymentData.total_amount}</p>
              <p><span className="font-medium">Total Amount:</span> {paymentData.total_amount}</p>
              <p><span className="font-medium">Signed Fields:</span> {paymentData.signed_field_names}</p>
              <p className="truncate"><span className="font-medium">Signature:</span> {paymentData.signature}</p>
              <p><span className="font-medium">Success URL:</span> {paymentData.success_url}</p>
              <p><span className="font-medium">Failure URL:</span> {paymentData.failure_url}</p>
            </div>
          </div>
  )
}

export default PaymentDebugCard
