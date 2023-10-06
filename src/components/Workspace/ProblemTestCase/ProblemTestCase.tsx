import { Problem } from "@/utils/types/problem";
import { useState } from "react";

type Props = {
  problem: Problem;
};

const ProblemTestCase = ({ problem }: Props) => {
  const [activeTestCase, setActiveTestCase] = useState(0);

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

        {/* Actual test cases */}
        <div className="shrink-1">
          <div className="mt-2 flex items-center gap-4 text-white">
            {problem.examples.map((_, index) => (
              <p
                key={index}
                className={`${
                  activeTestCase === index ? "bg-stone-500" : "bg-dark-layer-3"
                } relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl  px-4 py-2 text-sm font-medium transition-all hover:bg-stone-500`}
                onClick={() => setActiveTestCase(index)}
              >
                Case {index + 1}
              </p>
            ))}
          </div>

          <pre className="mt-2 flex flex-col gap-2 pb-4 font-semibold">
            <span className="text-sm font-medium text-white">Input:</span>
            <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
              {problem.examples[activeTestCase].inputText}
            </code>

            <span className="text-sm font-medium text-white">Output:</span>
            <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
              {problem.examples[activeTestCase].outputText}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemTestCase;
