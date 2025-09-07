import { setMessageWithTimeout, type Message } from "../store/reducers/messageReducer";
import type { AppDispatch } from "../store/store";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  
};

const apiHelper = async (
  url: string,
  options: ApiOptions = {},
  isFormData = false,
  dispatch?:any
) => {
  try {
    const headers: Record<string, string> = {
      ...(options.headers || {}),
    };

    // Only set JSON content-type if NOT FormData
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: options.body
        ? isFormData
          ? options.body // FormData → send directly
          : JSON.stringify(options.body)
        : undefined,
    });

    const res = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(res.message || "API error");
    }

    return res;
  } catch (error: any) {
    const message:Message={
      messages:error?.message||"API called failed",
      id:Date.now(),
      type:"error"
    };
     console.error("API call failed:", error);
    (dispatch as AppDispatch)(setMessageWithTimeout(message))
   
    throw error;
  }
};

export default apiHelper;
