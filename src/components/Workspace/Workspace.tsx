"use client";
import { Problem } from "@/utils/types/problem";
import Split from "react-split";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import ProblemTestCase from "./ProblemTestCase/ProblemTestCase";

type Props = {
  problem: Problem;
};

const Workspace = ({ problem }: Props) => {
  return (
    <Split
      className="split bg-dark-layer-2 flex flex-1 overflow-y-auto"
      minSize={0}
    >
      <ProblemDescription problem={problem}></ProblemDescription>
      <Split
        className="split flex-1"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <Playground></Playground>
        <ProblemTestCase></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
