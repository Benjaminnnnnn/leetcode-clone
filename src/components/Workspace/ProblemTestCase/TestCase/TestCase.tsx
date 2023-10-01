type TestCaseTabProps = {
  numTestCases: number;
};

type TestConsoleProps = {
  title: string;
  text: string;
};

const TestConsole = ({ title, text }: TestConsoleProps) => (
  <>
    <span className="text-sm font-medium text-white">{title}</span>
    <code className="w-max min-w-full cursor-text whitespace-nowrap rounded-lg border-none px-3 py-[10px] text-white">
      {text}
    </code>
  </>
);

const TestCaseTab = ({ numTestCases }: TestCaseTabProps) => {
  return (
    <div className="mt-2 flex items-center gap-4 text-white">
      {Array.from(new Array(numTestCases)).map((_, index) => (
        <p className="bg-dark-layer-3 relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all hover:bg-stone-500">
          Case {index + 1}
        </p>
      ))}
    </div>
  );
};

const TestCase = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <TestCaseTab numTestCases={3}></TestCaseTab>
      <pre className="mt-2 flex flex-col gap-2 pb-4 font-semibold">
        <TestConsole
          title="Input:"
          text="nums=[2,7,11,15], target=[9]"
        ></TestConsole>
        <TestConsole title="Output:" text="[0, 1]"></TestConsole>
      </pre>
    </div>
  );
};

export default TestCase;
