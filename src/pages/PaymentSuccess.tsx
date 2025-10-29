import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import { setMessageWithTimeout, type Message } from "../store/reducers/messageReducer";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("⏳ Verifying your payment...");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [countdown, setCountdown] = useState(5); // 5 second countdown
  const [redirecting, setRedirecting] = useState(false);
  const [searchParams] = useSearchParams();
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const pidx = searchParams.get("pidx");
        const transaction_id = searchParams.get("transaction_id");
        const purchase_order_id = searchParams.get("purchase_order_id");
        const amount = searchParams.get("amount");
        const total_amount = searchParams.get("total_amount");
        const method = searchParams.get("method");

        // Bank Transfer
        if (method === "bank" || method === "BANK") {
          setPaymentStatus("COMPLETED")
          const messages: Message[] = [
            { id: Date.now(), messages: "Receipt uploaded successfully", type: "info" },
            { id: Date.now() + 1, messages: "Wait until we verify", type: "info" },
          ];
          messages.forEach((msg) => dispatch(setMessageWithTimeout(msg, 5000)));

        }

        // Khalti
        if (pidx) {
          const response = await fetch(`${serverURL}/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              method: "KHALTI",
              transaction_id,
              amount,
              total_amount,
              purchase_order_id,
              pidx,
            }),
          });
          const res = await response.json();
          setPaymentStatus(res.status);
          setStatus(res.success ? "✅ Khalti payment verified successfully!" : "❌ Khalti payment verification failed");
        }

        // eSewa
        const dataParam = searchParams.get("data");
        if (dataParam) {
          const decodedData = JSON.parse(atob(dataParam));
          const { transaction_uuid, total_amount, signature } = decodedData;
          const response = await fetch(`${serverURL}/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transaction_uuid, amt: total_amount, signature, rawData: decodedData }),
          });
          const res = await response.json();
          setPaymentStatus(res.success ? "COMPLETED" : "FAILED");
          setStatus(res.success ? "✅ eSewa payment verified successfully!" : "❌ eSewa payment verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("⚠️ Error verifying payment.");
      }
    };

    verify();
  }, [searchParams, serverURL, dispatch]);

  // Countdown & Redirect
  useEffect(() => {
    if (!paymentStatus) return;

    setRedirecting(true);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/"); // redirect to homepage
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentStatus, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">
          Payment {paymentStatus === "COMPLETED" ? "Success" : paymentStatus === "FAILED" ? "Failed" : ""}
        </h1>
        <p className="text-lg text-gray-700">{status}</p>

        {redirecting && (
          <p className="mt-4 text-gray-500">
            Redirecting to homepage in {countdown} second{countdown > 1 ? "s" : ""}…
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
