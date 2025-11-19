import { problems } from "@/utils/problems";
import { isTestCaseResults, Problem } from "@/utils/types/problem";

const runHandler = (problem: Problem, solution: Function) => {
  const handler = problem.handlerFunction;
  if (typeof handler !== "function") {
    throw new Error(`${problem.id} handler is not a function`);
  }
  const result = handler(solution);
  if (!isTestCaseResults(result)) {
    throw new Error(`${problem.id} handler did not return test results`);
  }
  return result;
};

describe("problem handlers", () => {
  test("two-sum passes with correct solution and fails with incorrect", () => {
    const problem = problems["two-sum"];
    const correct = (nums: number[], target: number) => {
      const map = new Map<number, number>();
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
      }
      return [];
    };
    const incorrect = () => [-1, -1];

    const passResult = runHandler(problem, correct);
    expect(passResult.allPassed).toBe(true);

    const failResult = runHandler(problem, incorrect);
    expect(failResult.allPassed).toBe(false);
  });

  test("container-with-most-water uses two-pointer logic", () => {
    const problem = problems["container-with-most-water"];
    const correct = (height: number[]) => {
      let left = 0;
      let right = height.length - 1;
      let max = 0;
      while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);
        if (height[left] < height[right]) left++;
        else right--;
      }
      return max;
    };

    const result = runHandler(problem, correct);
    expect(result.allPassed).toBe(true);
  });

  test("number-of-islands DFS counts components", () => {
    const problem = problems["number-of-islands"];
    const correct = (grid: string[][]) => {
      const rows = grid.length;
      const cols = grid[0].length;
      let count = 0;

      const dfs = (r: number, c: number) => {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") {
          return;
        }
        grid[r][c] = "0";
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === "1") {
            count++;
            dfs(r, c);
          }
        }
      }
      return count;
    };

    const result = runHandler(problem, correct);
    expect(result.allPassed).toBe(true);
  });

  test("3sum handler validates triplets without duplicates", () => {
    const problem = problems["3sum"];
    const correct = (nums: number[]) => {
      nums.sort((a, b) => a - b);
      const result: number[][] = [];
      for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum === 0) {
            result.push([nums[i], nums[left], nums[right]]);
            left++;
            right--;
            while (left < right && nums[left] === nums[left - 1]) left++;
            while (left < right && nums[right] === nums[right + 1]) right--;
          } else if (sum < 0) {
            left++;
          } else {
            right--;
          }
        }
      }
      return result;
    };

    const result = runHandler(problem, correct);
    expect(result.allPassed).toBe(true);
  });
});
