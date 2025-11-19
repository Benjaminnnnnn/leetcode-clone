import { Problem } from "../types/problem";
import { bestTimeToBuyAndSellStock } from "./best-time-to-buy-and-sell-stock";
import { binarySearchProblem } from "./binary-search";
import { climbingStairsProblem } from "./climbing-stairs";
import { containsDuplicateProblem } from "./contains-duplicate";
import { containerWithMostWater } from "./container-with-most-water";
import { invertBinaryTree } from "./invert-binary-tree";
import { longestSubstringWithoutRepeatingCharacters } from "./longest-substring-without-repeating-characters";
import { jumpGame } from "./jump-game";
import { linkedListCycle } from "./linked-list-cycle";
import { maximumSubarray } from "./maximum-subarray";
import { maximumDepthOfBinaryTree } from "./maximum-depth-of-binary-tree";
import { mergeIntervals } from "./merge-intervals";
import { numberOfIslands } from "./number-of-islands";
import { productOfArrayExceptSelf } from "./product-of-array-except-self";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { subsetsProblem } from "./subsets";
import { twoSum } from "./two-sum";
import { threeSumProblem } from "./three-sum";
import { validParentheses } from "./valid-parentheses";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
  "container-with-most-water": containerWithMostWater,
  "merge-intervals": mergeIntervals,
  "maximum-depth-of-binary-tree": maximumDepthOfBinaryTree,
  "best-time-to-buy-and-sell-stock": bestTimeToBuyAndSellStock,
  subsets: subsetsProblem,
  "product-of-array-except-self": productOfArrayExceptSelf,
  "contains-duplicate": containsDuplicateProblem,
  "binary-search": binarySearchProblem,
  "climbing-stairs": climbingStairsProblem,
  "longest-substring-without-repeating-characters":
    longestSubstringWithoutRepeatingCharacters,
  "maximum-subarray": maximumSubarray,
  "number-of-islands": numberOfIslands,
  "3sum": threeSumProblem,
  "linked-list-cycle": linkedListCycle,
  "invert-binary-tree": invertBinaryTree,
};
