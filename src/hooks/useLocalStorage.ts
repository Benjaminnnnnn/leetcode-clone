import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== undefined) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {}
  }, [key, value]);

  return [value, setValue];
};
