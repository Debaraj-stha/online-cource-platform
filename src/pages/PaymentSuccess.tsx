import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("⏳ Verifying your payment...");
  const[paymentStatus,setPaymentStatus]=useState("")
  const [searchParams] = useSearchParams();
  const serverURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const verify = async () => {
      try {
        // 🔹 Case 1: Khalti
        const pidx = searchParams.get("pidx");
        const transaction_id = searchParams.get("transaction_id");
        const purchase_order_id = searchParams.get("purchase_order_id");
        const amount = searchParams.get("amount");
        const total_amount = searchParams.get("total_amount");
// http://localhost:3000/payment/success?pidx=hLAegzBTU9WS3qro5hnKJU&transaction_id=K9inz88a758ScDbZLrBBXh&tidx=K9inz88a758ScDbZLrBBXh&txnId=K9inz88a758ScDbZLrBBXh&amount=12000&total_amount=12000&mobile=98XXXXX000&status=Completed&purchase_order_id=68c1064505dd56d39bd53cac&purchase_order_name=Advance+react+course
        if (pidx) {
          const response = await fetch(`${serverURL}/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              method: "KHALTI",
              transaction_id,
              amount: amount,
              
              total_amount,
              purchase_order_id,
              pidx,
            }),
          });

          const res = await response.json();
          console.log("Khalti Verify Response:", res);
          setPaymentStatus(res.status)

          if (res.success) {
            setStatus(`✅ Khalti payment verified successfully!`);
          } else {
            setStatus(`❌ Khalti payment verification failed`);
          }
          return;
        }

        // 🔹 Case 2: eSewa
        const dataParam = searchParams.get("data");
        if (dataParam) {
          const decodedData = JSON.parse(atob(dataParam));
          console.log("Decoded eSewa Data:", decodedData);

          const { transaction_uuid, total_amount, signature } = decodedData;

          const response = await fetch(`${serverURL}/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transaction_uuid, amt: total_amount, signature, rawData: decodedData, }),
          });

          const res = await response.json();
          console.log("eSewa Verify Response:", res);

          if (res.success) {
            setStatus("✅ eSewa payment verified successfully!");
          } else {
            setStatus("❌ eSewa payment verification failed.");
          }
          return;
        }

        // If neither gateway params found
        setStatus("⚠️ No payment data found in URL.");
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("⚠️ Error verifying payment.");
      }
    };

    verify();
  }, [searchParams, serverURL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">
          Payment {paymentStatus==="COMPLETED" ? "Success":"Failed"}
        </h1>
        <p className="text-lg text-gray-700">{status}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
