"use client";

import { selectTheme } from "@/redux/features/theme/themeSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

/**
 * Keeps the document theme class in sync with the Redux theme state.
 * Centralizes DOM mutation instead of scattering effects across pages/components.
 */
const ThemeSync = () => {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
};

export default ThemeSync;
