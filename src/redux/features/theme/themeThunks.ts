import { AppThunk } from "@/redux/store";
import { toggleTheme } from "./themeSlice";

export type Theme = "light" | "dark";

export const toggleThemeThunk = (): AppThunk => async (dispatch, getState) => {
  try {
    const canUseBrowserStorage =
      typeof window !== "undefined" && typeof localStorage !== "undefined";
    if (canUseBrowserStorage) {
      const currentTheme = getState().theme.mode;
      const newTheme = (currentTheme === "light" ? "dark" : "light") as Theme;
      localStorage.setItem("theme", newTheme);
      dispatch(toggleTheme(newTheme));
    }
  } catch (error) {
    console.log("Unable to set app theme.");
  }
};
