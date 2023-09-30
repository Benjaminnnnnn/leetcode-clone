"use client";
import Split from "react-split";
import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type Props = {};

const Workspace = (props: Props) => {
  return (
    <Split
      className="split bg-dark-layer-2 flex flex-1 overflow-y-auto"
      minSize={0}
    >
      <ProblemDescription></ProblemDescription>
      <Playground></Playground>
      {/* <Split className="split" direction="vertical">
        <ProblemTestCase></ProblemTestCase>
      </Split> */}
    </Split>
  );
};

export default Workspace;
