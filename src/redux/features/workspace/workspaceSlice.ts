import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  testCaseConfig: {
    isExpanded: boolean;
    minSize: number;
  };
}

const initialState: WorkspaceState = {
  testCaseConfig: {
    isExpanded: false,
    minSize: 100,
  },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseConfig;

export const {} = workspaceSlice.actions;
export default workspaceSlice.reducer;
