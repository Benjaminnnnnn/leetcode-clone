type Props = {
  children: React.ReactNode;
  tooltip?: {
    text: string;
    keyboardNavigation?: string[];
  };
} & React.ComponentProps<"button">;

type KeyButtonProps = {
  keys: string[];
};

type TooltipProps = {
  children: React.ReactNode;
  keyboardNavigation?: string[];
};

const KeyButton = ({ keys }: KeyButtonProps) => {
  return (
    <p className="flex items-center gap-1">
      {keys.map((key, idx) => (
        <kbd className="rounded border border-gray-50 px-1" key={idx}>
          {key}
        </kbd>
      ))}
    </p>
  );
};

const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className="absolute left-1/2 top-8 flex -translate-x-1/2 scale-0 items-center gap-1 whitespace-nowrap rounded bg-black/95 px-2 py-1 text-xs shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 sm:top-10 sm:text-sm">
      {children}
    </div>
  );
};

const ButtonWithTooltip = ({ children, tooltip, className }: Props) => {
  return (
    <>
      <button
        className={`group relative flex items-center gap-1 px-2 py-1 ${className} disabled:opacity-50`}
      >
        {children}
        {tooltip && (
          <Tooltip>
            <p>{tooltip.text}</p>
            {tooltip.keyboardNavigation && (
              <KeyButton keys={tooltip.keyboardNavigation}></KeyButton>
            )}
          </Tooltip>
        )}
      </button>
    </>
  );
};

export default ButtonWithTooltip;
