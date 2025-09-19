export const setCookie = (key: string, value: string, expires: Date,path="/") => {
  const val = typeof value === "string" ? value : JSON.stringify(value)
  console.log(value)
  document.cookie = `${key}=${encodeURIComponent(val)}; expires=${expires.toUTCString()};path=${path}`;
};

export const removeCookie = (key: string,path="/") => {
  console.log("removing cookie", key);

  // Clear with explicit domain + path
  document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=${path}; domain=localhost`;
};


export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      const val = decodeURIComponent(value);
      return val;
    }
  }
  return null;
};
