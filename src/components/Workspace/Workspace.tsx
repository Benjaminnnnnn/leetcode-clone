"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type Props = {};

const Workspace = (props: Props) => {
  return (
    <Split className="split flex w-screen flex-1">
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
