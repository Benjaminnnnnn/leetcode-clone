import { Problem, TestCaseResults } from "../types/problem";

const starterCodeMergeIntervals =
  "function merge(intervals) {\n\t// Write your code here\n}";

const handlerMergeIntervals = (fn: Function) => {
  try {
    const inputs = [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
      [
        [1, 4],
        [4, 5],
      ],
    ];
    const answers = [
      [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
      [[1, 5]],
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

export const mergeIntervals: Problem = {
  id: "merge-intervals",
  title: "56. Merge Intervals",
  problemStatement:
    "<p class='mt-3'>Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>",
  examples: [
    {
      id: 0,
      inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      outputText: "[[1,6],[8,10],[15,18]]",
      explanation: "Intervals [1,3] and [2,6] overlap and become [1,6].",
    },
    {
      id: 1,
      inputText: "intervals = [[1,4],[4,5]]",
      outputText: "[[1,5]]",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ intervals.length ≤ 10<sup>4</sup></code></li><li class='mt-2'><code>intervals[i].length == 2</code></li><li class='mt-2'><code>0 ≤ start<sub>i</sub> ≤ end<sub>i</sub> ≤ 10<sup>4</sup></code></li>",
  handlerFunction: handlerMergeIntervals,
  starterCode: starterCodeMergeIntervals,
  order: 7,
  starterFunctionName: "function merge(",
};
