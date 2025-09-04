export const setCookie = (key: string, value: string, expires: Date) => {
  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

export const removeCookie = (key: string) => {
  document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
};
