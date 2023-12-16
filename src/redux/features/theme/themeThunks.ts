import { AppThunk } from "@/redux/store";
import { toggleTheme } from "./themeSlice";

export type Theme = "light" | "dark";

export const toggleThemeThunk = (): AppThunk => async (dispatch, getState) => {
  try {
    if (typeof window !== undefined && localStorage) {
      const newTheme = (
        localStorage.getItem("theme") === "light" ? "dark" : "light"
      ) as Theme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      dispatch(toggleTheme(newTheme));
    }
  } catch (error) {
    console.log("Unable to set app theme.");
  }
};
