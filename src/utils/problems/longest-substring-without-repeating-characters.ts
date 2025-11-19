import { Problem, TestCaseResults } from "../types/problem";

const starterCodeLongestSubstring =
  "function lengthOfLongestSubstring(s) {\n\t// Write your code here\n}";

const handlerLongestSubstring = (fn: Function) => {
  try {
    const inputs = ["abcabcbb", "bbbbb", "pwwkew", ""];
    const answers = [3, 1, 3, 0];

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

export const longestSubstringWithoutRepeatingCharacters: Problem = {
  id: "longest-substring-without-repeating-characters",
  title: "3. Longest Substring Without Repeating Characters",
  problemStatement:
    "<p class='mt-3'>Given a string <code>s</code>, find the length of the <strong>longest</strong> substring without repeating characters.</p>",
  examples: [
    {
      id: 0,
      inputText: "s = \"abcabcbb\"",
      outputText: "3",
      explanation: "The answer is \"abc\", with the length of 3.",
    },
    {
      id: 1,
      inputText: "s = \"bbbbb\"",
      outputText: "1",
    },
  ],
  constraints:
    "<li class='mt-2'><code>0 ≤ s.length ≤ 5 * 10<sup>4</sup></code></li><li class='mt-2'><code>s</code> consists of English letters, digits, symbols and spaces.</li>",
  handlerFunction: handlerLongestSubstring,
  starterCode: starterCodeLongestSubstring,
  order: 15,
  starterFunctionName: "function lengthOfLongestSubstring(",
};
