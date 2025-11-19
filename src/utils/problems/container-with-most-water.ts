import { Problem, TestCaseResults } from "../types/problem";

const starterCodeContainerWithMostWater =
  "function maxArea(height) {\n\t// Write your code here\n}";

const handlerContainerWithMostWater = (fn: Function) => {
  try {
    const heights = [
      [1, 8, 6, 2, 5, 4, 8, 3, 7],
      [1, 1],
      [4, 3, 2, 1, 4],
    ];
    const answers = [49, 1, 16];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < heights.length; i++) {
      const result = fn(heights[i]);
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

export const containerWithMostWater: Problem = {
  id: "container-with-most-water",
  title: "11. Container With Most Water",
  problemStatement:
    "<p class='mt-3'>Given <code>n</code> non-negative integers <code>height[i]</code> where each represents a point at coordinate <code>i</code>, <code>n</code> vertical lines are drawn such that the two endpoints of the line <code>i</code> are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p><p class='mt-3'>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p><p class='mt-3'>Return the maximum amount of water a container can store.</p><p class='mt-3'>You may not slant the container.</p>",
  examples: [
    {
      id: 0,
      inputText: "height = [1,8,6,2,5,4,8,3,7]",
      outputText: "49",
      explanation:
        "Max area is between lines at index 1 and 8 with height min(8,7)=7 and width 7, area = 49.",
    },
    {
      id: 1,
      inputText: "height = [1,1]",
      outputText: "1",
    },
  ],
  constraints:
    "<li class='mt-2'><code>2 ≤ n ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>0 ≤ height[i] ≤ 10<sup>4</sup></code></li>",
  handlerFunction: handlerContainerWithMostWater,
  starterCode: starterCodeContainerWithMostWater,
  order: 6,
  starterFunctionName: "function maxArea(",
};
