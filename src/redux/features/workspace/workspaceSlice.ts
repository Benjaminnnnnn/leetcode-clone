import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  testCaseIsExpanded: boolean;
  // testCaseConfig: {
  //   isExpanded: boolean;
  //   minSize: number;
  // };
}

const initialState: WorkspaceState = {
  testCaseIsExpanded: true,
  // testCaseConfig: {
  //   isExpanded: false,
  //   minSize: 100,
  // },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleTestCase(state, action) {
      console.log(action);
      state.testCaseIsExpanded = action.payload.testCaseIsExpanded;
    },
  },
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const { toggleTestCase } = workspaceSlice.actions;
export default workspaceSlice.reducer;
