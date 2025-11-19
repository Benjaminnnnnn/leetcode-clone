import { Problem, TestCaseResults } from "../types/problem";

const starterCodeContainsDuplicate =
  "function containsDuplicate(nums) {\n\t// Write your code here\n}";

const handlerContainsDuplicate = (fn: Function) => {
  try {
    const inputs = [
      [1, 2, 3, 1],
      [1, 2, 3, 4],
      [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
    ];
    const answers = [true, false, true];

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

export const containsDuplicateProblem: Problem = {
  id: "contains-duplicate",
  title: "217. Contains Duplicate",
  problemStatement:
    "<p class='mt-3'>Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice in the array, and return <code>false</code> if every element is distinct.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [1,2,3,1]",
      outputText: "true",
    },
    {
      id: 1,
      inputText: "nums = [1,2,3,4]",
      outputText: "false",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ nums.length ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></code></li>",
  handlerFunction: handlerContainsDuplicate,
  starterCode: starterCodeContainsDuplicate,
  order: 12,
  starterFunctionName: "function containsDuplicate(",
};
