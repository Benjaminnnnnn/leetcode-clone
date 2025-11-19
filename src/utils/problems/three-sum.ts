import { Problem, TestCaseResults } from "../types/problem";

const starterCodeThreeSum =
  "function threeSum(nums) {\n\t// Write your code here\n}";

const normalizeTriplets = (arr: number[][]) =>
  arr
    .map((triplet) => triplet.slice().sort((a, b) => a - b))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

const handlerThreeSum = (fn: Function) => {
  try {
    const inputs = [
      [-1, 0, 1, 2, -1, -4],
      [0, 1, 1],
      [0, 0, 0],
    ];
    const answers = [
      [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
      [],
      [[0, 0, 0]],
    ];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const result = normalizeTriplets(fn(inputs[i]));
      const expected = normalizeTriplets(answers[i]);
      const passed = JSON.stringify(result) === JSON.stringify(expected);
      results.allPassed = results.allPassed && passed;
      results.results.push({
        passed,
        userOutputs: result,
      });
    }
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const threeSumProblem: Problem = {
  id: "3sum",
  title: "15. 3Sum",
  problemStatement:
    "<p class='mt-3'>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p class='mt-3'>Notice that the solution set must not contain duplicate triplets.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [-1,0,1,2,-1,-4]",
      outputText: "[[-1,-1,2],[-1,0,1]]",
    },
    {
      id: 1,
      inputText: "nums = [0,1,1]",
      outputText: "[]",
    },
  ],
  constraints:
    "<li class='mt-2'><code>3 ≤ nums.length ≤ 3000</code></li><li class='mt-2'><code>-10<sup>5</sup> ≤ nums[i] ≤ 10<sup>5</sup></code></li>",
  handlerFunction: handlerThreeSum,
  starterCode: starterCodeThreeSum,
  order: 18,
  starterFunctionName: "function threeSum(",
};
