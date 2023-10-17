import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  testCaseIsExpanded: boolean;
  testCaseOutputs: Array<[]>;
}

const initialState: WorkspaceState = {
  testCaseIsExpanded: true,
  testCaseOutputs: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleTestCase(state, action) {
      state.testCaseIsExpanded = action.payload.testCaseIsExpanded;
    },
    updateTestCaseOutputs(state, action) {
      state.testCaseOutputs = [...action.payload];
    },
  },
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const selectTestCaseOutputs = (state: RootState) =>
  state.workspace.testCaseOutputs;

export const { toggleTestCase, updateTestCaseOutputs } = workspaceSlice.actions;
export default workspaceSlice.reducer;
