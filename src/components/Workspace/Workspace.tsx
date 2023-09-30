"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type Props = {};

const Workspace = (props: Props) => {
  return (
    <Split className="split flex flex-1 overflow-y-auto" minSize={0}>
      <ProblemDescription></ProblemDescription>
      <div>test</div>
      {/* <Split className="split" direction="vertical">
        <ProblemEditor></ProblemEditor>
        <ProblemTestCase></ProblemTestCase>
      </Split> */}
    </Split>
  );
};

export default Workspace;
