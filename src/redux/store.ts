import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import workspaceReducer from "./features/workspace/workspaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
