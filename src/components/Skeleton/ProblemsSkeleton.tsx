import React from "react";

type Props = {};

const SkeletonOdd = () => (
  <div className="flex items-center justify-between pt-4">
    <div className="ml-2 h-4 w-4 rounded-full bg-gray-400"></div>
    <div className="h-4 w-[30%] rounded-full bg-gray-400"></div>
    <div className="h-4 w-[25%] rounded-full bg-gray-400"></div>
    <div className="h-4 w-[15%] rounded-full bg-gray-400"></div>
    <div className="mr-4 h-4 w-4 rounded-full bg-gray-400"></div>
  </div>
);

const SkeletonEven = () => (
  <div className="flex items-center justify-between pt-4">
    <div className="ml-2 h-4 w-4 rounded-full bg-gray-300 "></div>
    <div className="h-4 w-[30%] rounded-full bg-gray-300 "></div>
    <div className="h-4 w-[25%] rounded-full bg-gray-300 "></div>
    <div className="h-4 w-[15%] rounded-full bg-gray-300 "></div>
    <div className="mr-4 h-4 w-4 rounded-full bg-gray-300 "></div>
  </div>
);

const ProblemsSkeleton = (props: Props) => {
  return (
    <div
      role="status"
      className="mx-auto w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded p-4 sm:w-4/5 md:p-6"
    >
      {Array.from(new Array(5)).map((_) => (
        <>
          <SkeletonOdd></SkeletonOdd>
          <SkeletonEven></SkeletonEven>
        </>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ProblemsSkeleton;
