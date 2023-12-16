import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import themeReducer from "./features/theme/themeSlice";
import workspaceReducer from "./features/workspace/workspaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
