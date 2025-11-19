import { Problem, TestCaseResults } from "../types/problem";

const starterCodeInvertBinaryTree =
  "function invertTree(root) {\n\t// root is an array representation of level order traversal\n\t// Write your code here\n}";

type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

const buildTree = (values: Array<number | null>): TreeNode | null => {
  if (!values.length) return null;
  const nodes = values.map((v) =>
    v === null ? null : ({ val: v, left: null, right: null } as TreeNode),
  );
  for (let i = 0, j = 1; j < nodes.length; i++) {
    if (nodes[i]) {
      nodes[i]!.left = nodes[j++] || null;
      if (j < nodes.length) {
        nodes[i]!.right = nodes[j++] || null;
      }
    }
  }
  return nodes[0];
};

const serializeTree = (root: TreeNode | null): Array<number | null> => {
  if (!root) return [];
  const queue: Array<TreeNode | null> = [root];
  const result: Array<number | null> = [];

  while (queue.length) {
    const node = queue.shift() || null;
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // trim trailing nulls
  while (result.length && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
};

const handlerInvertBinaryTree = (fn: Function) => {
  try {
    const inputs = [
      [4, 2, 7, 1, 3, 6, 9],
      [2, 1, 3],
    ];
    const answers = [
      [4, 7, 2, 9, 6, 3, 1],
      [2, 3, 1],
    ];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const tree = buildTree(inputs[i]);
      const resultTree = fn(tree);
      const serialized = serializeTree(resultTree);
      const passed = JSON.stringify(serialized) === JSON.stringify(answers[i]);
      results.allPassed = results.allPassed && passed;
      results.results.push({
        passed,
        userOutputs: serialized,
      });
    }
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const invertBinaryTree: Problem = {
  id: "invert-binary-tree",
  title: "226. Invert Binary Tree",
  problemStatement:
    "<p class='mt-3'>Given the <code>root</code> of a binary tree, invert the tree, and return its root.</p>",
  examples: [
    {
      id: 0,
      inputText: "root = [4,2,7,1,3,6,9]",
      outputText: "[4,7,2,9,6,3,1]",
    },
    {
      id: 1,
      inputText: "root = [2,1,3]",
      outputText: "[2,3,1]",
    },
  ],
  constraints:
    "<li class='mt-2'><code>The number of nodes in the tree is in the range [0, 100]</code></li><li class='mt-2'><code>-100 ≤ Node.val ≤ 100</code></li>",
  handlerFunction: handlerInvertBinaryTree,
  starterCode: starterCodeInvertBinaryTree,
  order: 20,
  starterFunctionName: "function invertTree(",
};
