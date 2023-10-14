import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/two-sum.png";

const starterCodeTwoSum =
  "function twoSum(nums, target) {\n\t// Write your code here\n}";

const handlerTwoSum = (fn: any) => {
  try {
    const nums = [
      [2, 7, 11, 15],
      [4, 2, 11, 7],
      [3, 3],
    ];
    const targets = [9, 9, 6];
    const answers = [
      [0, 1],
      [1, 3],
      [0, 1],
    ];

    // test user solution
    for (let i = 0; i < nums.length; i++) {
      const result = fn(nums[i], targets[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const twoSum: Problem = {
  id: "two-sum",
  title: "1. Two Sum",
  problemStatement: `<p className='mt-3'>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to</em> <code>target</code>.</p><p className='mt-3'>You may assume that each input would have <strong>exactly one solution</strong>, and youmay not use thesame element twice.</p><p className='mt-3'>You can return the answer in any order.</p>`,
  examples: [
    {
      id: 0,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, return [0, 1].",
    },
    {
      id: 1,
      img: example.src,
      inputText: "nums = [4,2,11,7], target = 9",
      outputText: "[1,3]",
      explanation: "Because nums[1] + nums[3] == 9, return [1, 3].",
    },
    {
      id: 2,
      inputText: "nums = [3,3], target = 6",
      outputText: "[0, 1]",
    },
  ],
  constraints: `<li className='mt-2'><code>2 ≤ nums.length ≤ 10<sup>4</sup></code></li><li className='mt-2'><code>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></code></li><li className='mt-2'><code>-10<sup>4</sup> ≤ target ≤ 10<sup>4</sup></code></li><li className='mt-2 text-sm'><strong>Only one valid answer exists.</strong></li>`,
  handlerFunction: handlerTwoSum,
  starterCode: starterCodeTwoSum,
  order: 1,
  starterFunctionName: "function twoSum(",
};
