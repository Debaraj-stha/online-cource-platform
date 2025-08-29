const capitalize = (str?: string | null): string | undefined => {
  if (!str || !str.trim()) return undefined;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (text: string, len = 100) =>
  text.length > len ? text.slice(0, len) + '...' : text;


export default capitalize