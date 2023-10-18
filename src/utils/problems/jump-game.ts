import _ from "lodash";
import { Problem, TestCaseResults } from "../types/problem";

export const jumpGameHandler = (fn: Function) => {
  try {
    const tests = [
      [2, 3, 1, 1, 4],
      [3, 2, 1, 0, 4],
      [2, 0, 0],
      [2, 5, 0, 0],
    ];
    const answers = [true, false, true, true];
    // test user solution
    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      const passed = _.isEqual(result, answers[i]);
      results.allPassed = results.allPassed && passed;
      results.results.push({
        passed: passed,
        userOutputs: result,
      });
      // assert.equal(result, answers[i]);
    }
    return results;
    // return true;
  } catch (error: any) {
    console.log("Error from jumpGameHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeJumpGameJS = `function canJump(nums) {
  // Write your code here
};`;

export const jumpGame: Problem = {
  id: "jump-game",
  title: "3. Jump Game",
  problemStatement: `
<p className="mt-3">
You are given an integer array <code>nums</code>. You are initially
positioned at the <strong>first index</strong>and each element in the
array represents your maximum jump length at that position.
</p>
<p className="mt-3">
Return <code>true</code> if you can reach the last index, or{" "}
<code>false</code> otherwise.
</p>
  `,

  examples: [
    {
      id: 0,
      inputText: `nums = [2,3,1,1,4]`,
      outputText: `true`,
      explanation:
        "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
    },
    {
      id: 1,
      inputText: `nums = [3,2,1,0,4]`,
      outputText: `false`,
      explanation:
        "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
    },
  ],
  constraints: `<li className='mt-2'><code>1 <= nums.length <= 10^4</code></li><li className='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
  starterCode: starterCodeJumpGameJS,
  handlerFunction: jumpGameHandler,
  starterFunctionName: "function canJump(",
  order: 3,
};
