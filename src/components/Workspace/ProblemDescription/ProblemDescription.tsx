import * as DOMPurify from "dompurify";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import ExampleCard from "./Example/ExampleCard";

type Props = {
  // problem?;
};

const s =
  "<p>Lorem ipsum dolor sit amet, <code>test code</code> consectetur adipisicing elit. <strong>Id praesentium autem</strong> fuga minus dolor eos debitis consequatur? Aspernatur quia vel, maiores sequi facilis eaque nobis, amet in labore enim odit! </p>";

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
  return (
    <>
      <div className="bg-neutral-700">
        {/* TAB */}
        <div className="flex h-11 w-full items-end overflow-x-hidden text-white">
          <p className="cursor-pointer rounded-t bg-neutral-600 px-4 py-2 text-xs">
            Description
          </p>
        </div>

        <div className="flex overflow-auto px-0 py-4">
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
                className={`${"bg-green-500 text-green-300"} inline-block rounded-xl bg-opacity-[0.15] px-2.5 py-1 text-xs font-medium capitalize`}
              >
                Easy
              </div>
              <div className="ml-4 cursor-pointer rounded p-2 text-lg text-green-600 transition-colors duration-200 hover:text-green-300">
                <BsCheck2Circle />
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-stone-500 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillLike className="group-hover:text-blue-500" />
                {/* {true && <Spinner></Spinner>} */}
                <p className="text-xs">2</p>
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-stone-500 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillDislike className="group-hover:text-blue-500" />
                {/* {true && <Spinner></Spinner>} */}
                <p className="text-xs">2</p>
              </div>
              <div
                className="group ml-4 flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-stone-500 hover:text-white"
                // onClick={handleLike}
              >
                <AiFillStar className="group-active:text-yellow-500" />
              </div>
            </div>

            {/* problem statement */}
            <div className="problem-statement text-sm text-white">
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s) }}
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
                <li>test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDescription;
