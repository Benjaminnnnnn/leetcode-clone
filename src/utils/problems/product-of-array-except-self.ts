import { Problem, TestCaseResults } from "../types/problem";

const starterCodeProductExceptSelf =
  "function productExceptSelf(nums) {\n\t// Write your code here\n}";

const handlerProductExceptSelf = (fn: Function) => {
  try {
    const inputs = [
      [1, 2, 3, 4],
      [-1, 1, 0, -3, 3],
    ];
    const answers = [
      [24, 12, 8, 6],
      [0, 0, 9, 0, 0],
    ];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      const passed =
        JSON.stringify(result) === JSON.stringify(answers[i]);
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

export const productOfArrayExceptSelf: Problem = {
  id: "product-of-array-except-self",
  title: "238. Product of Array Except Self",
  problemStatement:
    "<p class='mt-3'>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p><p class='mt-3'>The product of any prefix or suffix of <code>nums</code> is guaranteed to fit in a 32-bit integer.</p><p class='mt-3'>You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [1,2,3,4]",
      outputText: "[24,12,8,6]",
    },
    {
      id: 1,
      inputText: "nums = [-1,1,0,-3,3]",
      outputText: "[0,0,9,0,0]",
    },
  ],
  constraints:
    "<li class='mt-2'><code>2 ≤ nums.length ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>-30 ≤ nums[i] ≤ 30</code></li><li class='mt-2'><code>The product of any prefix or suffix of nums fits in a 32-bit integer.</code></li>",
  handlerFunction: handlerProductExceptSelf,
  starterCode: starterCodeProductExceptSelf,
  order: 11,
  starterFunctionName: "function productExceptSelf(",
};
