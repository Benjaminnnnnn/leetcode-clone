"use client";
import { selectTheme } from "@/redux/features/theme/themeSlice";
import {
  selectTestCaseIsExpanded,
  toggleTestCase,
} from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Problem } from "@/utils/types/problem";
import { useEffect } from "react";
import Split from "react-split";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import ProblemTestCase from "./ProblemTestCase/ProblemTestCase";

type Props = {
  problem: Problem;
};

const Workspace = ({ problem }: Props) => {
  const dispatch = useAppDispatch();
  const testIsExpanded = useAppSelector(selectTestCaseIsExpanded);

  const theme = useAppSelector(selectTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
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
        <Playground problem={problem}></Playground>
        <ProblemTestCase problem={problem}></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
