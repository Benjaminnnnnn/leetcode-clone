import Split from "react-split";

type Props = {};

const Workspace = (props: Props) => {
  return (
    <Split
      className="split"
      direction="vertical"
      minSize={150}
      gutterSize={9}
      dragInterval={2}
    >
      <div></div>
      <div></div>
    </Split>
    // <div>
    //   <Split className="split">
    //     <ProblemDescription></ProblemDescription>
    //     <div>
    //       {/* <Split className="split" direction="vertical">
    //         <ProblemEditor></ProblemEditor>
    //         <ProblemTestCase></ProblemTestCase>
    //       </Split> */}
    //       split
    //     </div>
    //   </Split>
    // </div>
  );
};

export default Workspace;
