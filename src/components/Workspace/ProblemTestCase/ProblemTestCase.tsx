import {
  selectTestCaseIsExpanded,
  selectTestCaseResults,
} from "@/redux/features/workspace/workspaceSlice";
import { useAppSelector } from "@/redux/hooks";
import { Problem } from "@/utils/types/problem";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  problem: Problem;
};

const ProblemTestCase = ({ problem }: Props) => {
  const [activeTestCase, setActiveTestCase] = useState(0);
  const results = useAppSelector(selectTestCaseResults);
  const testCaseIsExpanded = useAppSelector(selectTestCaseIsExpanded);

  // useEffect(() => {
  //   animate(testCaseContainerRef.current, {
  //     height: testCaseIsExpanded ? "auto" : "0",
  //   });
  //   console.log("animating");
  // }, [testCaseIsExpanded]);

  return (
    <AnimatePresence>
      <motion.div
        // key={testCaseIsExpanded ? "expanded" : "closed"}
        // initial={false}
        // animate={{
        //   height: "auto",
        //   opacity: 1,
        // }}
        // exit={{
        //   height: 0,
        //   opacity: 0,
        // }}
        className={`${
          testCaseIsExpanded ? "h-auto" : "h-0"
        }  flex w-full flex-col justify-between gap-2 overflow-auto px-5 pb-10`}
      >
        <div className="flex flex-col overflow-y-auto">
          {/* Test case heading */}
          <div className="mt-2 flex h-10 items-center gap-6">
            <div className="relative z-auto flex h-full cursor-pointer flex-col justify-center">
              <p className="text-sm font-medium leading-5 text-white">
                Testcases
              </p>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {/* Actual test cases */}
          <div className="shrink-1 mt-2">
            <div className="flex items-center gap-4 text-white">
              {problem.examples.map((_, index) => (
                <p
                  key={index}
                  className={`${
                    activeTestCase === index
                      ? "bg-stone-500"
                      : "bg-dark-layer-3"
                  } relative z-auto inline-flex cursor-pointer items-center whitespace-nowrap rounded px-4 py-1.5 text-sm font-medium transition-all hover:bg-stone-500`}
                  onClick={() => setActiveTestCase(index)}
                >
                  <span>Case {index + 1}</span>

                  {results.length > 0 && (
                    <span
                      className={`absolute right-0 top-0 h-2 w-2 -translate-y-1/3 translate-x-1/2 rounded-full ${
                        results[index].passed ? "bg-green-500" : "bg-rose-500"
                      }`}
                    ></span>
                  )}
                </p>
              ))}
            </div>

            <pre className="mt-2 flex flex-col gap-2 pb-4 font-semibold">
              <span className="text-sm font-medium text-white">Input:</span>
              <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
                {problem.examples[activeTestCase].inputText}
              </code>

              {results.length > 0 && (
                <>
                  <span className="text-sm font-medium text-white">
                    Outputs:
                  </span>
                  <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
                    {results[activeTestCase].userOutputs instanceof Array
                      ? `[${results[activeTestCase].userOutputs.join(",")}]`
                      : results[activeTestCase].userOutputs.toString()}
                  </code>
                </>
              )}

              <span className="text-sm font-medium text-white">
                Expected Output:
              </span>
              <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
                {problem.examples[activeTestCase].outputText}
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProblemTestCase;
