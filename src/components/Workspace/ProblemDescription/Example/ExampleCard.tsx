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
      <p className="font-medium text-white">Example {index + 1}:</p>
      {img && (
        <img src={img} alt={`example ${index + 1}`} className="h-full w-full" />
      )}
      <div className="example-card">
        <pre>
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
