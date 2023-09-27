type Props = {
  keys: string[];
};

const KeyButton = ({ keys }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {keys.map((key, idx) => (
        <span className="rounded border border-gray-50 px-1" key={idx}>
          {key}
        </span>
      ))}
    </div>
  );
};

export default KeyButton;
