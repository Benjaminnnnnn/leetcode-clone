import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "./themeThunks";

interface ThemeState {
  mode: Theme;
}

// initializes the "mode" state by reading from localstorage
// const initializeModeState = (): Theme => {
//   try {
//     if (typeof window !== undefined) {
//       const theme = localStorage.getItem("theme") as Theme;
//       return theme;
//     }
//   } catch (error) {}
//   return "light";
// };

const initialState: ThemeState = {
  mode:
    typeof window !== undefined
      ? (localStorage.getItem("theme") as Theme)
      : "light",
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
