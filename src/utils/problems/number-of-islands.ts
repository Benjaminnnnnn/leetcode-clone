import { Problem, TestCaseResults } from "../types/problem";

const starterCodeNumberOfIslands =
  "function numIslands(grid) {\n\t// grid is a 2D array of '1' and '0'\n\t// Write your code here\n}";

const handlerNumberOfIslands = (fn: Function) => {
  try {
    const inputs = [
      [
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
      ],
      [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
      ],
    ];
    const answers = [1, 3];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i].map((row) => [...row]));
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

export const numberOfIslands: Problem = {
  id: "number-of-islands",
  title: "200. Number of Islands",
  problemStatement:
    "<p class='mt-3'>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the number of islands.</p><p class='mt-3'>An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.</p>",
  examples: [
    {
      id: 0,
      inputText:
        "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
      outputText: "1",
    },
    {
      id: 1,
      inputText:
        "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
      outputText: "3",
    },
  ],
  constraints:
    "<li class='mt-2'><code>m == grid.length</code></li><li class='mt-2'><code>n == grid[i].length</code></li><li class='mt-2'><code>1 ≤ m, n ≤ 300</code></li><li class='mt-2'><code>grid[i][j]</code> is '0' or '1'.</li>",
  handlerFunction: handlerNumberOfIslands,
  starterCode: starterCodeNumberOfIslands,
  order: 17,
  starterFunctionName: "function numIslands(",
};
