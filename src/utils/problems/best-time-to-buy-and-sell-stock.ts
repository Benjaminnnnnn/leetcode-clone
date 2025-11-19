import { Problem, TestCaseResults } from "../types/problem";

const starterCodeBestTime =
  "function maxProfit(prices) {\n\t// Write your code here\n}";

const handlerBestTime = (fn: Function) => {
  try {
    const prices = [
      [7, 1, 5, 3, 6, 4],
      [7, 6, 4, 3, 1],
    ];
    const answers = [5, 0];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < prices.length; i++) {
      const result = fn(prices[i]);
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

export const bestTimeToBuyAndSellStock: Problem = {
  id: "best-time-to-buy-and-sell-stock",
  title: "121. Best Time to Buy and Sell Stock",
  problemStatement:
    "<p class='mt-3'>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p><p class='mt-3'>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.</p><p class='mt-3'>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return <code>0</code>.</p>",
  examples: [
    {
      id: 0,
      inputText: "prices = [7,1,5,3,6,4]",
      outputText: "5",
      explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6).",
    },
    {
      id: 1,
      inputText: "prices = [7,6,4,3,1]",
      outputText: "0",
      explanation: "No profitable transaction possible.",
    },
  ],
  constraints:
    "<li class='mt-2'><code>1 ≤ prices.length ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>0 ≤ prices[i] ≤ 10<sup>4</sup></code></li>",
  handlerFunction: handlerBestTime,
  starterCode: starterCodeBestTime,
  order: 9,
  starterFunctionName: "function maxProfit(",
};
