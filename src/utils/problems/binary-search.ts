import { Problem, TestCaseResults } from "../types/problem";

const starterCodeBinarySearch =
  "function search(nums, target) {\n\t// Write your code here\n}";

const handlerBinarySearch = (fn: Function) => {
  try {
    const nums = [
      [-1, 0, 3, 5, 9, 12],
      [-1, 0, 3, 5, 9, 12],
    ];
    const targets = [9, 2];
    const answers = [4, -1];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < nums.length; i++) {
      const result = fn(nums[i], targets[i]);
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

export const binarySearchProblem: Problem = {
  id: "binary-search",
  title: "704. Binary Search",
  problemStatement:
    "<p class='mt-3'>Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.</p><p class='mt-3'>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [-1,0,3,5,9,12], target = 9",
      outputText: "4",
    },
    {
      id: 1,
      inputText: "nums = [-1,0,3,5,9,12], target = 2",
      outputText: "-1",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ nums.length ≤ 10<sup>4</sup></code></li><li class='mt-2'><code>-10<sup>4</sup> < nums[i], target < 10<sup>4</sup></code></li><li class='mt-2'><code>All the integers in nums are unique.</code></li><li class='mt-2'><code>nums is sorted in ascending order.</code></li>",
  handlerFunction: handlerBinarySearch,
  starterCode: starterCodeBinarySearch,
  order: 13,
  starterFunctionName: "function search(",
};
