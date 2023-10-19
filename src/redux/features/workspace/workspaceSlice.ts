import { TestCaseResults } from "@/utils/types/problem";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  testCaseIsExpanded: boolean;
  testCaseResults: TestCaseResults;
}

const initialState: WorkspaceState = {
  testCaseIsExpanded: true,
  testCaseResults: {
    allPassed: true,
    results: [],
  },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleTestCase(state, action) {
      state.testCaseIsExpanded = action.payload.testCaseIsExpanded;
    },
    updateTestCaseResults(state, action) {
      state.testCaseResults = { ...action.payload };
    },
    resetTestCaseResults(state) {
      state.testCaseResults = initialState.testCaseResults;
    },
  },
});

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const selectTestCaseResults = (state: RootState) =>
  state.workspace.testCaseResults.results;

export const selectTestCaseAllPassed = (state: RootState) =>
  state.workspace.testCaseResults.allPassed;

export const { toggleTestCase, updateTestCaseResults, resetTestCaseResults } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
