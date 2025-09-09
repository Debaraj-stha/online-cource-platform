// PaymentGateway.tsx
import React, { useEffect, useState } from "react";
import apiHelper from "../utils/apiHelper";

interface PaymentGatewayProps {
  studentId: string;
  courseId: string;
  amount: number;
  gateway: "esewa" | "khalti" | "banktransfer";
  debugMode?: boolean;
}

interface PaymentData {
  amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code?: string;
  signed_field_names?: string;
  signature?: string;
  success_url: string;
  failure_url: string;
  tax_amount?: string;
  product_service_charge?: string;
  product_delivery_charge?: string;
  [key: string]: any; // for additional fields
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  studentId,
  courseId,
  amount,
  gateway,
  debugMode = false,
}) => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPayment = async () => {
      try {
        setLoading(true);
        const res = await apiHelper(`${import.meta.env.VITE_SERVER_URL}/payments/init`, {
          method: "POST",
          body: { studentId, courseId, amount, gateway },
        });

        if (res.success && res.paymentData) {
          setPaymentData(res.paymentData);
          setError(null);
        } else {
          setError(res.message || "Payment initialization failed");
          console.log("Payment init failed:", res);
        }
      } catch (err) {
        setError("Error initializing payment. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [studentId, courseId, amount, gateway]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData) {
      setError("Payment data not available. Please try again.");
      return;
    }

    let actionUrl = "";
    const fields: Record<string, any> = { ...paymentData };

    switch (gateway) {
      case "esewa":
        actionUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        break;
      case "khalti":
        actionUrl = "https://khalti.com/payment/initiate"; // Example, replace with actual
        break;
      case "banktransfer":
        actionUrl = "https://your-bank-gateway.com/pay"; // Example
        break;
      default:
        setError("Unsupported payment gateway");
        return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = actionUrl;
    form.style.display = "none";

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    if (debugMode) {
      console.log(`[${gateway}] Form data:`, fields);
      setError("Debug mode enabled. Check console for form data.");
      return;
    }

    form.submit();
  };

  if (loading) return <p>Initializing {gateway} payment...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-gray-800">Pay via {gateway}</h2>
      <p className="mt-2 text-gray-600">Amount: NPR {paymentData?.total_amount}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {debugMode ? "Debug Form Data" : `Pay with ${gateway}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
