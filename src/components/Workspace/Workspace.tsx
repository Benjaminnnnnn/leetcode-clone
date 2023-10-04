"use client";
import {
  selectTestCaseIsExpanded,
  toggleTestCase,
} from "@/redux/features/workspace/workspaceSlice";
import { Problem } from "@/utils/types/problem";
import { useDispatch, useSelector } from "react-redux";
import Split from "react-split";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import ProblemTestCase from "./ProblemTestCase/ProblemTestCase";

type Props = {
  problem: Problem;
};

const Workspace = ({ problem }: Props) => {
  const dispatch = useDispatch();
  const testIsExpanded = useSelector(selectTestCaseIsExpanded);

  return (
    <Split
      className="split flex flex-1 overflow-y-auto bg-dark-layer-2"
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
          // since sizes is a percentage, use a percentage to determine if split is closed
          if ((sizes[1] * window.innerHeight) / 100 <= 100) {
            console.log("close test case");
            dispatch(
              toggleTestCase({
                testIsExpanded: false,
              }),
            );
          }
        }}
      >
        <Playground problem={problem}></Playground>
        <ProblemTestCase></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
