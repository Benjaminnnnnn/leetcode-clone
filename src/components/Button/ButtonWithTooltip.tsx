import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  tooltip?: {
    text: string;
    keyboardNavigation?: string[];
    options?: {
      alignment?: undefined | "left" | "right";
      position?: undefined | "compact" | "loose";
    };
  };
} & React.ComponentProps<"button">;

type KeyButtonProps = {
  keys: string[];
};

type TooltipProps = {
  children: React.ReactNode;
  alignment?: string;
  position?: string;
};

const KeyButton = ({ keys }: KeyButtonProps) => {
  return (
    <p className="flex items-center gap-1">
      {keys.map((key, idx) => (
        <kbd
          className="rounded border border-primary-foreground px-1 text-primary-foreground"
          key={idx}
        >
          {key}
        </kbd>
      ))}
    </p>
  );
};

const Tooltip = ({ children, alignment, position }: TooltipProps) => {
  let alignmentStyles, positionStyles;

  switch (alignment) {
    case "left":
      alignmentStyles = "right-1/4";
      break;
    case "right":
      alignmentStyles = "left-1/4";
      break;
    default:
      alignmentStyles = "left-1/2 -translate-x-1/2";
      break;
  }

  switch (position) {
    case "compact":
      positionStyles = "top-6";
      break;
    case "loose":
      positionStyles = "top-10";
      break;
    default:
      positionStyles = "top-8";
      break;
  }

  return (
    <div
      className={`${alignmentStyles} ${positionStyles} absolute top-8 z-[9999]
      flex scale-0 items-center gap-1 whitespace-nowrap rounded bg-foreground
      px-2 py-1 text-xs text-primary-foreground shadow-lg transition-all duration-300
      ease-in-out group-hover:scale-100 group-disabled:hidden`}
    >
      {children}
    </div>
  );
};

const ButtonWithTooltip = ({
  children,
  tooltip,
  className,
  ...props
}: Props) => {
  return (
    <>
      <button
        className={cn(
          `group relative flex items-center gap-1 px-2 py-1
          disabled:cursor-not-allowed disabled:text-muted disabled:opacity-50`,
          className,
        )}
        {...props}
      >
        {children}
        {tooltip && (
          <Tooltip {...tooltip.options}>
            <p className="text-primary-foreground">{tooltip.text}</p>
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
