import type { Course, CourseResource, Lesson, ResourceType } from "../@types/course";

export const getCourseFormData = (course: Course, instructor_id: string) => {
  try {
    const formData = new FormData();

    Object.entries(course).forEach(([key, value]) => {
      if (value === undefined || value === null || value == 0) return;
      console.log("key", key, "value", value)

      // File fields
      if (key === "thumbnail" || key === "certificate") {
        if (value instanceof File) {
          formData.append(key, value);
        }
        return;
      }

      // Arrays of strings
      if (Array.isArray(value) && value.every((v) => typeof v === "string")) {

        value.forEach((v) => formData.append(`${key}[]`, v));
        return;
      }

      // Objects or arrays of objects → JSON stringify
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
        return;
      }

      // Primitive values (string, number, boolean)
      formData.append(key, String(value));
    });
    formData.append("instructor", instructor_id)

    return formData;
  } catch (error) {
    console.error("Error building FormData:", error);
    return null;
  }
};

export const getLocalCurrencyFromIP = async () => {
  try {
    const url = import.meta.env.VITE_SERVER_URL
    const res = await fetch(`${url}/locale`);
    const data = await res.json();
    return data.currency; // e.g. "NPR", "INR", "USD"
  } catch {
    return "USD"; // fallback
  }
}

export const fetchExchangeRate = async () => {
  // check cache
  const exchange_rate = localStorage.getItem("exchange_rate")
  const lastFetched = localStorage.getItem("exchange_rate_lastFetched")

  // if data exists and is fresh (< 12h old), skip fetching
  if (exchange_rate && lastFetched && Date.now() - parseInt(lastFetched) < 12 * 60 * 60 * 1000) {
    return
  }

  try {
    const API_URL = import.meta.env.VITE_EXCHANGE_RATE_API
    const res = await fetch(`${API_URL}/USD`)
    const data = await res.json()
    if (data.result === "success") {
      localStorage.setItem("exchange_rate", JSON.stringify(data.rates))
      localStorage.setItem("exchange_rate_lastFetched", Date.now().toString())
    }
  } catch (err) {
    console.error("Failed to fetch exchange rates:", err)
  }
}
export const convertPriceToLocalPrice = (price: number, from: string, to: string) => {
  try {
    // If same currency, no conversion needed
    if (from === to) return { price, success: false }

    // Get cached exchange rates
    let ratesStr = localStorage.getItem("exchange_rate")
    if (!ratesStr) return { price, success: false }
    const rates = JSON.parse(ratesStr) as Record<string, number>

    // Make sure both currencies exist in rates
    if (!rates[from] || !rates[to]) return { price, success: false }

    // Convert from → base (USD by default in most APIs) → to
    const baseAmount = price / rates[from]
    const converted = baseAmount * rates[to]

    return { price: converted, success: true }
  } catch (error) {
    console.error("convertPriceToLocalPrice error:", error)
    return { price, success: false }
  }
}


export const fetchCurrency = async () => {
  try {
    const now = Date.now()
    let lastSaved = localStorage.getItem("last_saved_currency")
    const savedCurrency = localStorage.getItem("currency")
    if (savedCurrency && lastSaved && Date.now() - parseInt(lastSaved) < 30 * 24 * 60 * 60) return
    const currency = await getLocalCurrencyFromIP()
    localStorage.setItem("currency", currency)
    localStorage.setItem("last_saved_currency", now.toString())
    console.log("Local currency:", currency)

  } catch (err) {
    console.error("Failed to get local currency:", err)
  }
}
interface Props {
  url?: string,
  previewURL?: string
  thumbnailURL?: string
  type?: ResourceType
}
export const fetchSignedUrl = async ({ url, previewURL, thumbnailURL, type = "video" }: Props) => {
  try {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    const query = new URLSearchParams({
      type: type,
      ...(url ? { url: url } : {}),
      ...(previewURL ? { previewUrl: previewURL } : {}),
      ...(thumbnailURL ? { thumbUrl: thumbnailURL } : {}),
    });
    console.log(previewURL)
    const response = await fetch(`${SERVER_URL}/course/resource/signed-url?${query.toString()}`);
    const data = await response.json();
    if (previewURL) {
      window.open(data.url, "_blank");
    }
    else if (data.url) {
      window.open(data.preview, "_blank");
    }
    else if (thumbnailURL) {
      window.open(data.thumbnail, "_blank");
    }
    else {
      alert("Failed to get file URL");
    }
  } catch (err) {
    console.error(err);
  }
};

