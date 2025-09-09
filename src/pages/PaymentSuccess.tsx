import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiHelper from "../utils/apiHelper";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const dataParam = searchParams.get("data");
        if (!dataParam) {
          setStatus("⚠️ No payment data found.");
          return;
        }

        const decodedData = JSON.parse(atob(dataParam));
        console.log(decodedData)

        const { transaction_uuid, total_amount, signature } = decodedData;

        const serverURL = import.meta.env.VITE_SERVER_URL;
        const completeURL = `${serverURL}/payments/verfy`
        console.log(completeURL)
        const response = await fetch(completeURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              transaction_uuid: transaction_uuid,
              amt: total_amount,
              signature,
              rawData: decodedData,
            }
          }),
        });
        const res = await response.json()
        if (res.success) {
          setStatus("✅ Payment verified successfully!");
        } else {
          setStatus("❌ Payment verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("⚠️ Error verifying payment.");
      }
    };

    verify();
  }, [searchParams]);


  return (
    <div className="wrapper container">
      <h1>Payment Success</h1>
      <p>{status}</p>
    </div>
  );
};

export default PaymentSuccess;
