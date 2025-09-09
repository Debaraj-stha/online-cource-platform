import React, { useEffect, useState } from "react";
import apiHelper from "../utils/apiHelper";
import { useLocation } from "react-router-dom";
import PaymentLoading from "../components/PaymentLoading";
import PaymentError from "../components/PaymentError";

const PayViaEsewa = () => {
  const location = useLocation();
  const state = location.state ?? {};

  const studentId = "68baedad8b94ba9c6c0e93e2";
  const courseId = state.courseId || "68bc2f4349021756ef579edf";

  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const initPayment = async () => {
      try {
        setLoading(true);
        const res = await apiHelper(`${import.meta.env.VITE_SERVER_URL}/payments/init`, {
          method: "POST",
          body: { studentId, courseId, amount: 7 },
        });

        if (res.success && res.paymentData) {
          setPaymentData(res.paymentData);
          setError(null);
        } else {
          const errorMsg = res.message || "Payment initialization failed";
          setError(errorMsg);
          console.log("Payment initialization failed", res);
        }
      } catch (error) {
        const errorMsg = "Error initializing payment. Please try again.";
        setError(errorMsg);
        console.error("Error initializing payment:", error);
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [studentId, courseId]);
  if (loading) {
    return <PaymentLoading />;
  }

  if (error) {
    return <PaymentError debugMode={debugMode} error={error} setDebugMode={setDebugMode} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      <h2 className="text-gray-900">9806800001</h2>

      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="text-gray-900">
        <input type="hidden" id="amount" name="amount" value={paymentData.amount} required  readOnly/>
        <input type="hidden" id="tax_amount" name="tax_amount" value={paymentData.tax_amount} required readOnly />
        <input type="hidden" id="total_amount" name="total_amount" value={paymentData.total_amount} required readOnly />
        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={paymentData.transaction_uuid} required readOnly />
        <input type="hidden" id="product_code" name="product_code" value={paymentData.product_code} required readOnly />
        <input type="hidden" id="product_service_charge" name="product_service_charge" value={paymentData.product_service_charge} required readOnly />
        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={paymentData.product_delivery_charge} required  readOnly/>
        <input type="hidden" id="success_url" name="success_url" value={paymentData.success_url} required readOnly />
        <input type="hidden" id="failure_url" name="failure_url" value={paymentData.failure_url} required />
        <input type="hidden" id="signed_field_names" className="bg-red-600" name="signed_field_names" value={paymentData.signed_field_names} required readOnly />
        <input type="hidden" id="signature" name="signature"  value= {paymentData.signature} required readOnly />
        <input value="Submit" type="submit"  className="bg-gray-900 text-white"/>
      </form>


    </div>
  );
};

export default PayViaEsewa;