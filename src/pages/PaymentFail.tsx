import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiHelper from "../utils/apiHelper";

const PaymentFail = () => {
  const [searchParams] = useSearchParams(); // ✅ get params from the current URL

  // Automatically mark payment as failed in backend
  useEffect(() => {
    const markFailed = async () => {
      try {
        const tid = searchParams.get("tid"); // ✅ read tid
        console.log("Transaction ID from URL:", tid);

        if (!tid) return;

        await apiHelper(`${import.meta.env.VITE_SERVER_URL}/payments/fail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { transaction_uuid: tid },
        }).then((res) => console.log("Fail update response:", res));
      } catch (err) {
        console.error("Error marking payment failed:", err);
      }
    };

    markFailed();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          Oops! Your payment was not completed. Please try again or contact support.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/courses"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go Back to Courses
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
