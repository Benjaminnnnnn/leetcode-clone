export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

export type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: string;
  handlerFunction: ((fn: any) => boolean) | string;
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
