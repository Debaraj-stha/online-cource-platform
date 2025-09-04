import { setMessageWithTimeout } from "../store/reducers/messageReducer";
import type { AppDispatch } from "../store/store";

type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: any;
};

const apiHelper = async (url: string, options: ApiOptions = {}, dispatch?: AppDispatch) => {
  try {
    const response = await fetch(url, { ...options });
    const data = await response.json();

    if (!response.ok) {
      if (dispatch) {
        dispatch(setMessageWithTimeout({ id: Date.now(), type: "error", messages: data.message || "Error" }, 5000));
      }
      throw new Error(data.message || "API error");
    }

    return data;
  } catch (error: any) {
    if (dispatch) {
      dispatch(setMessageWithTimeout({ id: Date.now(), type: "error", messages: error.message }, 5000));
    }
    throw error;
  }
};

export default apiHelper;
