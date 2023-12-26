import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "./themeThunks";

interface ThemeState {
  mode: Theme;
}

// initializes the "mode" state by reading from localstorage
const initializeModeState = (): Theme => {
  try {
    if (typeof window !== undefined && localStorage) {
      const theme = localStorage.getItem("theme") as Theme;
      return theme || "light";
    }
    return "light";
  } catch (error) {
    return "light";
  }
};

const initialState: ThemeState = {
  mode: initializeModeState(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<Theme>) {
      state.mode = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.mode;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
