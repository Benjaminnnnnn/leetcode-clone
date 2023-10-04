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
    toggleTestcase(state) {
      state.testCaseIsExpanded = !state.testCaseIsExpanded;
    },
  },
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const { toggleTestcase } = workspaceSlice.actions;
export default workspaceSlice.reducer;
