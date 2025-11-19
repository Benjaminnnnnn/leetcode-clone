import { Problem, TestCaseResults } from "../types/problem";

const starterCodeLinkedListCycle =
  "function hasCycle(head) {\n\t// head is the start node of a linked list\n\t// Write your code here\n}";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const buildCycledList = (values: number[], pos: number) => {
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  let cycleNode: ListNode | null = null;

  values.forEach((val, idx) => {
    const node = new ListNode(val);
    if (!head) head = node;
    if (tail) tail.next = node;
    tail = node;
    if (idx === pos) cycleNode = node;
  });

  if (tail && cycleNode) {
    const tailNode: ListNode = tail;
    tailNode.next = cycleNode;
  }
  return head;
};

const handlerLinkedListCycle = (fn: Function) => {
  try {
    const inputs: Array<{ values: number[]; pos: number }> = [
      { values: [3, 2, 0, -4], pos: 1 },
      { values: [1, 2], pos: 0 },
      { values: [1], pos: -1 },
    ];
    const answers = [true, true, false];

    const results: TestCaseResults = {
      allPassed: true,
      results: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      const { values, pos } = inputs[i];
      const head = buildCycledList(values, pos);
      const result = fn(head);
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

export const linkedListCycle: Problem = {
  id: "linked-list-cycle",
  title: "141. Linked List Cycle",
  problemStatement:
    "<p class='mt-3'>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p><p class='mt-3'>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the <code>next</code> pointer. Internally, <code>pos</code> is used to denote the index of the node that tail's <code>next</code> pointer is connected to. <code>pos</code> is <code>-1</code> if there is no cycle. Note that <code>pos</code> is not passed as a parameter.</p><p class='mt-3'>Return <code>true</code> if there is a cycle in the linked list. Otherwise, return <code>false</code>.</p>",
  examples: [
    {
      id: 0,
      inputText: "head = [3,2,0,-4], pos = 1",
      outputText: "true",
    },
    {
      id: 1,
      inputText: "head = [1,2], pos = 0",
      outputText: "true",
    },
  ],
  constraints:
    "<li class='mt-2'><code>0 ≤ Node.val ≤ 10<sup>5</sup></code></li><li class='mt-2'><code>pos</code> is <code>-1</code> or a valid index in the linked-list.</li><li class='mt-2'><code>1 ≤ number of nodes ≤ 10<sup>4</sup></code></li>",
  handlerFunction: handlerLinkedListCycle,
  starterCode: starterCodeLinkedListCycle,
  order: 19,
  starterFunctionName: "function hasCycle(",
};
