import { Problem, TestCaseResults } from "../types/problem";

const starterCodeMaximumSubarray =
  "function maxSubArray(nums) {\n\t// Write your code here\n}";

const handlerMaximumSubarray = (fn: Function) => {
  try {
    const inputs = [
      [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      [1],
      [5, 4, -1, 7, 8],
    ];
    const answers = [6, 1, 23];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      const passed = result === answers[i];
      results.allPassed = results.allPassed && passed;
      results.results.push({
        passed,
        userOutputs: [result],
      });
    }
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const maximumSubarray: Problem = {
  id: "maximum-subarray",
  title: "53. Maximum Subarray",
  problemStatement:
    "<p class='mt-3'>Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      outputText: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    {
      id: 1,
      inputText: "nums = [1]",
      outputText: "1",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ nums.length ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></code></li>",
  handlerFunction: handlerMaximumSubarray,
  starterCode: starterCodeMaximumSubarray,
  order: 16,
  starterFunctionName: "function maxSubArray(",
};
