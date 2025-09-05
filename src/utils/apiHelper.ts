type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
};

const apiHelper = async (url: string, options: ApiOptions = {}) => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const res = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(` ${res.message}`);
    }
    return res
  } catch (error:any){
    console.error("API call failed:", error)
    throw error
  }
};

export default apiHelper;
