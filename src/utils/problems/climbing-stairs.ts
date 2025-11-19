import { Problem, TestCaseResults } from "../types/problem";

const starterCodeClimbingStairs =
  "function climbStairs(n) {\n\t// Write your code here\n}";

const handlerClimbingStairs = (fn: Function) => {
  try {
    const inputs = [2, 3, 5];
    const answers = [2, 3, 8];

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

export const climbingStairsProblem: Problem = {
  id: "climbing-stairs",
  title: "70. Climbing Stairs",
  problemStatement:
    "<p class='mt-3'>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p><p class='mt-3'>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>",
  examples: [
    {
      id: 0,
      inputText: "n = 2",
      outputText: "2",
      explanation: "There are two ways: 1+1 steps or 2 steps.",
    },
    {
      id: 1,
      inputText: "n = 3",
      outputText: "3",
      explanation: "1+1+1, 1+2, or 2+1 steps.",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ n ≤ 45</code></li>",
  handlerFunction: handlerClimbingStairs,
  starterCode: starterCodeClimbingStairs,
  order: 14,
  starterFunctionName: "function climbStairs(",
};
