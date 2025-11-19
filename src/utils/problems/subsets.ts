import { Problem, TestCaseResults } from "../types/problem";

const starterCodeSubsets =
  "function subsets(nums) {\n\t// Write your code here\n}";

const handlerSubsets = (fn: Function) => {
  try {
    const inputs = [
      [1, 2, 3],
      [0],
    ];
    const answers = [
      [
        [],
        [1],
        [2],
        [3],
        [1, 2],
        [1, 3],
        [2, 3],
        [1, 2, 3],
      ],
      [[], [0]],
    ];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      const sortedResult = result
        .map((subset: number[]) => subset.slice().sort((a, b) => a - b))
        .sort((a: number[], b: number[]) => a.length - b.length || a[0] - b[0]);
      const sortedAnswer = answers[i]
        .map((subset) => subset.slice().sort((a, b) => a - b))
        .sort((a, b) => a.length - b.length || a[0] - b[0]);

      const passed =
        JSON.stringify(sortedResult) === JSON.stringify(sortedAnswer);
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

export const subsetsProblem: Problem = {
  id: "subsets",
  title: "78. Subsets",
  problemStatement:
    "<p class='mt-3'>Given an integer array <code>nums</code> of unique elements, return <em>all possible subsets (the power set)</em>.</p><p class='mt-3'>The solution set must not contain duplicate subsets. Return the solution in any order.</p>",
  examples: [
    {
      id: 0,
      inputText: "nums = [1,2,3]",
      outputText: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
    },
    {
      id: 1,
      inputText: "nums = [0]",
      outputText: "[[],[0]]",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ nums.length ≤ 10</code></li><li class='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li><li class='mt-2'><code>All the numbers of nums are unique.</code></li>",
  handlerFunction: handlerSubsets,
  starterCode: starterCodeSubsets,
  order: 10,
  starterFunctionName: "function subsets(",
};
