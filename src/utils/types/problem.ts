export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

// Single test case result and outputs
export type TestCaseResult = {
  passed: boolean;
  userOutputs: Number[];
};

// All test cases results and outputs
export type TestCaseResults = {
  allPassed: boolean;
  results: Array<TestCaseResult>;
};

export type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: string;
  handlerFunction: ((fn: any) => boolean | TestCaseResults) | string;
  starterFunctionName: string;
};

export type DBProblem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  order: number;
  likes: number;
  dislikes: number;
  videoId?: string;
  link?: string;
};

export const isTestCaseResults = (
  value: boolean | TestCaseResults,
): value is TestCaseResults => {
  return (value as TestCaseResults).allPassed !== undefined;
};
