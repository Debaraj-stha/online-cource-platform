import { useEffect, useState } from "react";
import apiHelper from "../utils/apiHelper";
import type { PaymentMethod } from "../@types/course";
interface Props{
    courseId:string
    studentId:string
    amount:string|number
    method?:PaymentMethod
    amount_object?:any
    product_name?:string
    return_url?:string
    discount?:number
    tax?:number
    customer_info?:Record<string,string>
}
const usePayment=({courseId,studentId,method="E-SEWA",amount,return_url,amount_object,product_name,customer_info}:Props)=>{
      const [paymentData, setPaymentData] = useState<any>(null);
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPayment = async () => {
      try {
        setLoading(true);
        const res = await apiHelper(
          `${import.meta.env.VITE_SERVER_URL}/payments/init`,
          {
            method: "POST",
            body: { studentId, courseId, amount: amount, discount: 20,method,product_name,amount_object,return_url,customer_info },
          }
        );

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
  return {
    error,
    loading,
    paymentData
  }

}

export default usePayment