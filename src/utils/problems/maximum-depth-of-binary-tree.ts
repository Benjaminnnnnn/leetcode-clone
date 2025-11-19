import { Problem, TestCaseResults } from "../types/problem";

const starterCodeMaxDepth =
  "function maxDepth(root) {\n\t// root is an array representation of level order traversal\n\t// Write your code here\n}";

type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

const buildTree = (values: Array<number | null>): TreeNode | null => {
  if (!values.length) return null;
  const nodes: Array<TreeNode | null> = values.map((v) =>
    v === null ? null : { val: v, left: null, right: null },
  );
  for (let i = 0, j = 1; j < nodes.length; i++) {
    if (nodes[i]) {
      nodes[i]!.left = (nodes[j++] as TreeNode | null) || null;
      if (j < nodes.length) {
        nodes[i]!.right = (nodes[j++] as TreeNode | null) || null;
      }
    }
  }
  return nodes[0];
};

const handlerMaxDepth = (fn: Function) => {
  try {
    const inputs = [
      [3, 9, 20, null, null, 15, 7],
      [1, null, 2],
    ];
    const answers = [3, 2];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const tree = buildTree(inputs[i]);
      const result = fn(tree);
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

export const maximumDepthOfBinaryTree: Problem = {
  id: "maximum-depth-of-binary-tree",
  title: "104. Maximum Depth of Binary Tree",
  problemStatement:
    "<p class='mt-3'>Given the <code>root</code> of a binary tree, return its maximum depth.</p><p class='mt-3'>A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>",
  examples: [
    {
      id: 0,
      inputText: "root = [3,9,20,null,null,15,7]",
      outputText: "3",
    },
    {
      id: 1,
      inputText: "root = [1,null,2]",
      outputText: "2",
    },
  ],
  constraints:
    "<li class='mt-2'><code>The number of nodes in the tree is in the range [0, 10<sup>4</sup>]</code></li><li class='mt-2'><code>-100 ≤ Node.val ≤ 100</code></li>",
  handlerFunction: handlerMaxDepth,
  starterCode: starterCodeMaxDepth,
  order: 8,
  starterFunctionName: "function maxDepth(",
};
