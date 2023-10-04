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
      snapOffset={200}
    >
      <ProblemDescription problem={problem}></ProblemDescription>
      <Split
        className="split relative flex-1"
        direction="vertical"
        sizes={[60, 40]}
        minSize={0}
        snapOffset={100}
        onDragEnd={(sizes) => {
          console.log(sizes);
        }}
      >
        <Playground problem={problem}></Playground>
        <ProblemTestCase></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
