import Spinner from "@/components/Loader/Spinner";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

type Props = {
  // problem?;
};

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
          <div className="px-4">
            {/* Problem heading */}
            <div className="flex">
              <div className="mr-2 flex-1 whitespace-nowrap text-lg font-medium text-white">
                1. Problem Title
              </div>
            </div>

            {/* Difficulty Tab */}
            <div className="mt-3 flex items-center">
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
                <AiFillStar className="group-hover:text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDescription;
