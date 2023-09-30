import * as DOMPurify from "dompurify";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import ExampleCard from "./Example/ExampleCard";

type Props = {
  // problem?;
};

const statement =
  "<p className='mt-3'>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to</em> <code>target</code>.</p><p className='mt-3'>You may assume that each input would have <strong>exactly one solution</strong>, and youmay not use thesame element twice.</p><p className='mt-3'>You can return the answer in any order.</p>";

const constraints =
  "<li className='mt-2'><code>2 ≤ nums.length ≤ 10</code></li><li className='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li><li className='mt-2'><code>-10 ≤ target ≤ 10</code></li><li className='mt-2 text-sm'><strong>Only one valid answer exists.</strong></li>";

const examples = [
  {
    id: 1,
    img: "",
    inputText: "nums=[2,7,11,15], target=[9]",
    outputText: "[0,1]",
    explanation: "Because nums[0] + nums[1] == 9, return [0, 1].",
  },
  {
    id: 1,
    img: "https://miro.medium.com/v2/resize:fit:1400/1*f-jZ1s8rMW8t77TwQM0kRA.png",
    inputText: "nums=[4,2,11,7], target=[9]",
    outputText: "[1,3]",
    explanation: "Because nums[1] + nums[3] == 9, return [1, 3].",
  },
];

const ProblemDescription = (props: Props) => {
  console.log(statement);
  return (
    <>
      <div className="overflow-y-auto">
        {/* TAB */}
        <div className="bg-dark-layer-1 flex h-11 w-full items-end text-white">
          <p className="bg-dark-layer-2 cursor-pointer rounded-t px-4 py-2 text-xs">
            Description
          </p>
        </div>

        <div className="flex px-0 py-4">
          <div className="space-y-3 px-4">
            {/* Problem heading */}
            <div className="flex">
              <div className="mr-2 flex-1 whitespace-nowrap text-lg font-medium text-white">
                1. Problem Title
              </div>
            </div>

            {/* Difficulty Tab */}
            <div className="flex items-center">
              <div
                className={`${"bg-teal-500 text-teal-300"} inline-block rounded-xl bg-opacity-[0.15] px-2.5 py-1 text-xs font-medium capitalize`}
              >
                Easy
              </div>
              <div className="ml-4 cursor-pointer rounded p-2 text-lg text-teal-600 transition-colors duration-200 hover:text-teal-300">
                <BsCheck2Circle />
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillLike className="group-hover:text-blue-500" />
                {/* {true && <Spinner></Spinner>} */}
                <p className="text-xs">2</p>
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillDislike className="group-hover:text-blue-500" />
                {/* {true && <Spinner></Spinner>} */}
                <p className="text-xs">2</p>
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillStar className="group-active:text-yellow-500" />
              </div>
            </div>

            {/* problem statement */}
            <div className="problem-statement text-sm text-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(statement, {
                    ALLOWED_ATTR: ["className"],
                  }),
                }}
              ></div>
            </div>

            {/* Examples */}
            <div>
              {examples.map((example, index) => (
                <ExampleCard
                  key={example.id}
                  index={index}
                  {...example}
                ></ExampleCard>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <p className="text-sm font-medium text-white">Constraints:</p>
              <ul className="ml-5 list-disc text-white">
                <div
                  // className="space-y-1"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(constraints, {
                      ALLOWED_ATTR: ["className"],
                    }),
                  }}
                ></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDescription;
