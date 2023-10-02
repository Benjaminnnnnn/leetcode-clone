type Props = {
  index: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

const ExampleCard = ({
  index,
  inputText,
  img,
  outputText,
  explanation,
}: Props) => {
  return (
    <div>
      <p className="whitespace-nowrap font-medium text-white">
        Example {index + 1}:
      </p>
      {img && (
        <img
          src={img}
          alt={`example ${index + 1}`}
          className="mx-auto h-full w-full min-w-[20rem] max-w-lg"
        />
      )}
      <div className="example-card overflow-x-auto">
        <pre className="w-max min-w-full">
          <p>
            <strong>Input: </strong>
            {inputText}
          </p>
          <p>
            <strong>Output: </strong>
            {outputText}
          </p>
          {explanation && (
            <p>
              <strong>Explanation: </strong>
              {outputText}
            </p>
          )}
        </pre>
      </div>
    </div>
  );
};

export default ExampleCard;
