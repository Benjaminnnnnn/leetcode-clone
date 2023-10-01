"use client";
import Split from "react-split";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import ProblemTestCase from "./ProblemTestCase/ProblemTestCase";

type Props = {};

const Workspace = (props: Props) => {
  return (
    <Split
      className="split bg-dark-layer-2 flex flex-1 overflow-y-auto"
      minSize={0}
    >
      <ProblemDescription></ProblemDescription>

      <Split
        className="split"
        direction="vertical"
        sizes={[70, 30]}
        minSize={60}
      >
        <Playground></Playground>
        <ProblemTestCase></ProblemTestCase>
      </Split>
    </Split>
  );
};

export default Workspace;
