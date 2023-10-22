import { TestCaseResults } from "@/utils/types/problem";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WorkspaceState {
  settingsModal: boolean;
  testCaseIsExpanded: boolean;
  testCaseResults: TestCaseResults;
}

const initialState: WorkspaceState = {
  settingsModal: false,
  testCaseIsExpanded: true,
  testCaseResults: {
    allPassed: false,
    results: [],
  },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleSettingsModal(state, action: PayloadAction<boolean>) {
      state.settingsModal = action.payload;
    },
    toggleTestCase(state, action: PayloadAction<boolean>) {
      state.testCaseIsExpanded = action.payload;
    },
    updateTestCaseResults(state, action: PayloadAction<TestCaseResults>) {
      state.testCaseResults = { ...action.payload };
    },
    resetTestCaseResults(state) {
      state.testCaseResults = initialState.testCaseResults;
    },
  },
});
export const selectSettingModal = (state: RootState) =>
  state.workspace.settingsModal;

export const selectTestCaseIsExpanded = (state: RootState) =>
  state.workspace.testCaseIsExpanded;

export const selectTestCaseResults = (state: RootState) =>
  state.workspace.testCaseResults.results;

export const selectTestCaseAllPassed = (state: RootState) =>
  state.workspace.testCaseResults.allPassed;

export const {
  toggleSettingsModal,
  toggleTestCase,
  updateTestCaseResults,
  resetTestCaseResults,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
