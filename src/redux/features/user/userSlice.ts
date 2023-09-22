import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  //   user;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
