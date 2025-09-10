import { useState, useCallback } from "react";
import apiHelper from "../utils/apiHelper";
import type { PaymentMethod } from "../@types/course";

interface Props {
  courseId: string;
  studentId: string;
  amount: string;
  product_name?: string;
  discount?: number;
  tax?: number;
}
export interface InitProps {
  method?: PaymentMethod
  return_url?: string
  customer_info?: Record<string, string>,
  amount_object?: any
}

const usePayment = ({
  courseId,
  studentId,
  amount,
  product_name,
  discount = 0,
  tax = 0,
}: Props) => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const SERVER_URL = import.meta.env.VITE_SERVER_URL

  // Ask backend to initialize payment
  const initPayment = useCallback(async ({ method = "E-SEWA", return_url, customer_info, amount_object }: InitProps) => {
    try {
      setLoading(true);
      const res = await apiHelper(
        `${SERVER_URL}/payments/init`,
        {
          method: "POST",
          body: {
            studentId,
            courseId,
            amount: method === "KHALTI" ? parseInt(amount) : amount,
            discount,
            tax,
            method,
            product_name,
            amount_object,
            return_url,
            customer_info,
          },
        }
      );

      if (res.success && res.paymentData) {
        setPaymentData(res.paymentData);
        setError(null);
        return res.paymentData;
      } else {
        const errorMsg = res.error || res.message || "Payment initialization failed";
        setError(errorMsg);
        return null;
      }
    } catch (err) {
      console.error("Error initializing payment:", err);
      setError("Error initializing payment. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [
    studentId,
    courseId,
    amount,
    discount,
    tax,
    product_name,
  ]);

  //   Submit form for eSewa
  const payViaEsewa = useCallback(async () => {
    const data = await initPayment({});
    if (!data) return;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = import.meta.env.VITE_ESEWA_URL;

    Object.keys(data).forEach((key) => {
      const input = document.createElement("input");
      input.name = key;
      input.type = "hidden";
      input.value = data[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [initPayment]);

  //   Handle Khalti (example: redirect with token)
  const payViaKhalti = useCallback(async ({ return_url, customer_info, amount_object, }: InitProps) => {
    const data = await initPayment({ method: "KHALTI", return_url, customer_info, amount_object });
    if (!data) return;

    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      setError("Khalti payment link missing.");
    }
  }, [initPayment]);

  const pickInput = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/png,image/jpg,image/jpeg"

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        setSelectedFile(target.files[0])
      }
    }
    input.click()
  }

  const uploadRecipt = useCallback(async (return_url: string) => {
    try {
      if (!selectedFile) return
      const data = new FormData()
      data.append("recipt", selectedFile)
      data.append("amount", amount)
      data.append("discount", discount.toString())
      data.append("courseId", courseId)
      data.append("studentId", studentId)
      data.append("tax", tax.toString())
      data.append("method", "BANK-TRANSFER")

      const res = await apiHelper(
        `${SERVER_URL}/payments/init`,
        {
          method:"POST",
          body: data,
        },
        true
      )
      console.log(res)
      if (res?.success) {
        window.location.href = return_url
      }
      else {
        console.log("res", res)
      }
    } catch (error) {
      console.log(error)
    }
  }, [selectedFile])

  return {
    error,
    loading,
    paymentData,
    initPayment,
    payViaEsewa,
    payViaKhalti,
    pickInput,
    selectedFile,
    setSelectedFile,
    uploadRecipt
  };
};

export default usePayment;
