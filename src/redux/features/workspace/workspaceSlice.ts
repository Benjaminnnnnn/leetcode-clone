import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  testCaseIsExpanded: boolean;
}

const initialState: WorkspaceState = {
  testCaseIsExpanded: true,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleTestCase(state, action) {
      state.testCaseIsExpanded = action.payload.testCaseIsExpanded;
    },
  },
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const { toggleTestCase } = workspaceSlice.actions;
export default workspaceSlice.reducer;
