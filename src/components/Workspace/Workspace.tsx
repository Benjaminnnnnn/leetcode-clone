"use client";
import {
  selectTestCaseIsExpanded,
  toggleTestCase,
} from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Problem } from "@/utils/types/problem";
import Split from "react-split";
import ProblemCodeEditor from "./ProblemCodeEditor/ProblemCodeEditor";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import ProblemTestCase from "./ProblemTestCase/ProblemTestCase";

type Props = {
  problem: Problem;
};

const Workspace = ({ problem }: Props) => {
  const dispatch = useAppDispatch();
  const testIsExpanded = useAppSelector(selectTestCaseIsExpanded);

  return (
    <Split
      className="split flex flex-1 overflow-y-auto"
      minSize={0}
      snapOffset={200}
    >
      <ProblemDescription problem={problem}></ProblemDescription>
      <Split
        className="split relative flex-1"
        direction="vertical"
        sizes={testIsExpanded ? [60, 40] : [100, 0]}
        minSize={0}
        snapOffset={100}
        onDragEnd={(sizes) => {
          if ((sizes[1] * window.innerHeight) / 100 <= 100) {
            dispatch(toggleTestCase(false));
          }
        }}
      >
        <ProblemCodeEditor problem={problem}></ProblemCodeEditor>
        <ProblemTestCase problem={problem}></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
