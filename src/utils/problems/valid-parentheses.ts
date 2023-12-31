import _ from "lodash";
import { Problem, TestCaseResults } from "../types/problem";

export const validParenthesesHandler = (fn: any) => {
  try {
    const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
    const answers = [true, true, false, false, true];

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
      // assert.deepEqual(result, answers[i]);
    }
    return results;
    // return true;
  } catch (error: any) {
    console.error("Error from validParenthesesHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;

export const validParentheses: Problem = {
  id: "valid-parentheses",
  title: "4. Valid Parentheses",
  problemStatement: `<p className='mt-3'>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p className='mt-3'>An input string is valid if:</p> <ul> <li className='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li className='mt-3'>Open brackets must be closed in the correct order.</li>
	<li className="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
	</ul>`,
  examples: [
    {
      id: 0,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 1,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 3,
      inputText: 's = "([)]"',
      outputText: "false",
    },
  ],
  constraints: `<li className='mt-2'><code>1 <= s.length <= 10<sup>4</sup></code></li>
<li className='mt-2 '><code>s</code> consists of parentheses only <code className="text-md">'()[]{}'</code>.</li>`,
  handlerFunction: validParenthesesHandler,
  starterCode: starterCodeValidParenthesesJS,
  starterFunctionName: "function validParentheses(",
  order: 4,
};
