import React from 'react'

const DemoPaymentInfoCard = () => {
    return (

            <div className="mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-md space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Payment Test Details</h2>

                <div className='flex flex-col sm:flex-row gap-4'>
                    {/* eSewa Details */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex-1/2">
                    <h3 className="font-semibold text-red-700 mb-2 whitespace-nowrap">eSewa Test Account</h3>
                    <p className="text-red-600">
                        <strong>ID:</strong> 9806800001 / 2 / 3 / 4 / 5
                    </p>
                    <p className="text-red-600">
                        <strong>Password:</strong> Nepal@123
                    </p>
                    <p className="text-red-600">
                        <strong>MPIN:</strong> 1122
                    </p>
                    <p className="text-red-600">
                        <strong>Token:</strong> 123456
                    </p>
                </div>

                {/* Khalti Details */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex-1/2">
                    <h3 className="font-semibold text-blue-700 mb-2">Khalti Test Account</h3>
                    <p className="text-blue-600">
                        <strong>Test IDs:</strong> 9800000000 / 9800000001 / 9800000002 / 9800000003 / 9800000004 / 9800000005
                    </p>
                    <p className="text-blue-600">
                        <strong>MPIN:</strong> 1111
                    </p>
                    <p className="text-blue-600">
                        <strong>OTP:</strong> 987654
                    </p>
                </div>
                </div>
            </div>

        
    )
}

export default DemoPaymentInfoCard
