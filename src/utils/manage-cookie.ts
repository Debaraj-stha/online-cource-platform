export const setCookie = (key: string, value: string, expires: Date) => {
  const val = typeof value === "string" ? value : JSON.stringify(value)
  document.cookie = `${key}=${encodeURIComponent(val)}; expires=${expires.toUTCString()};`;
};

export const removeCookie = (key: string) => {
  console.log("removing cookie", key)
  document.cookie = `${key}=; expires=${new Date(0).toUTCString()};`;
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
