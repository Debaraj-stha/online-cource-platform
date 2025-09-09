import React, { type SetStateAction } from 'react'
interface Props{
    error:string
    debugMode:boolean
    setDebugMode:React.Dispatch<SetStateAction<boolean>>
}
const PaymentError = ({error,setDebugMode,debugMode}:Props) => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Error</h2>
            <p className="mt-4 text-lg text-gray-600">{error}</p>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
            <button
              onClick={() => setDebugMode(!debugMode)}
              className="group relative w-40 flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {debugMode ? "Disable Debug" : "Enable Debug"}
            </button>
          </div>
        </div>
      </div>
  )
}

export default PaymentError
