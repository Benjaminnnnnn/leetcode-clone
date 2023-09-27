type Props = {
  children: React.ReactNode;
  keyboardNavigation?: string[];
};

type KeyButtonProps = {
  keys: string[];
};

const KeyButton = ({ keys }: KeyButtonProps) => {
  return (
    <div className="flex items-center gap-1">
      {keys.map((key, idx) => (
        <kbd className="rounded border border-gray-50 px-1" key={idx}>
          {key}
        </kbd>
      ))}
    </div>
  );
};

const Tooltip = ({ children, keyboardNavigation }: Props) => {
  return (
    <p className="absolute left-1/2 top-8 flex -translate-x-1/2 scale-0 items-center gap-1 whitespace-nowrap rounded bg-black/95 px-2 py-1 text-xs shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 sm:top-10 sm:text-sm">
      {children}
      {keyboardNavigation && <KeyButton keys={keyboardNavigation}></KeyButton>}
    </p>
  );
};

export default Tooltip;
