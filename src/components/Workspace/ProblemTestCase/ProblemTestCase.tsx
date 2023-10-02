import EditorFooter from "../Playground/EditorFooter/EditorFooter";
import TestCase from "./TestCase/TestCase";

type Props = {};

const ProblemTestCase = (props: Props) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 overflow-auto px-5">
      <div className="flex flex-col overflow-y-auto">
        {/* Test case heading */}
        <div className="mt-2 flex h-10 items-center gap-6">
          <div className="relative flex h-full cursor-pointer flex-col justify-center">
            <p className="text-sm font-medium leading-5 text-white">
              Testcases
            </p>
            <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
          </div>
        </div>
        <TestCase></TestCase>
      </div>
      <EditorFooter></EditorFooter>
    </div>
  );
};

export default ProblemTestCase;
