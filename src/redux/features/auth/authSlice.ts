import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AuthState {
  isOpen: boolean;
  type: "login" | "signup" | "forgotPassword";
}

const initialState: AuthState = {
  isOpen: false,
  type: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isOpen = true;
      state.type = "login";
    },
    signup(state) {
      state.isOpen = true;
      state.type = "signup";
    },
    forgotPassword(state) {
      state.isOpen = true;
      state.type = "forgotPassword";
    },
    authModalClose() {
      return { ...initialState };
    },
  },
});

export const selectOpen = (state: RootState) => state.auth.isOpen;

export const { authModalClose, login, signup, forgotPassword } =
  authSlice.actions;
export default authSlice.reducer;
