import React, {  useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PaymentLoading from "../components/PaymentLoading";
import PaymentError from "../components/PaymentError";
import usePayment from "../hooks/usePayment";

const PayViaEsewa = () => {
  const location = useLocation();
  const state = location.state ?? {};

  const studentId = "68baedad8b94ba9c6c0e93e2";
  const courseId = state.courseId || "68bc2f4349021756ef579edf";
  const [debugMode, setDebugMode] = useState(false);

  // Ref for hidden form
  const formRef = useRef<HTMLFormElement>(null);

  const { loading, error, paymentData } = usePayment({
    courseId,
    studentId,
    amount: "120",
  })
  if (loading) {
    return <PaymentLoading />;
  }

  if (error) {
    return (
      <PaymentError
        debugMode={debugMode}
        error={error}
        setDebugMode={setDebugMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex md:justify-center md:items-center items-start py-11  px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pay with eSewa
        </h2>

        {/* Amount Details */}
        <div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-gray-800">Rs. {paymentData.amount}</span>
          </div>
          {paymentData.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="text-green-600">- Rs. {paymentData.discount}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span className="">Rs. {paymentData.total_amount}</span>
          </div>
        </div>

        {/* Hidden form */}
        <form
          ref={formRef}
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          {Object.keys(paymentData).map((key) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={paymentData[key]}
              readOnly
            />
          ))}
        </form>

        {/* Submit Button */}
        <button
          onClick={() => formRef.current?.submit()}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
        >
          Pay Now with eSewa
        </button>
      </div>
    </div>
  );
};

export default PayViaEsewa;
