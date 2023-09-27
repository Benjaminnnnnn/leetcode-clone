type Props = {
  children: React.ReactNode;
};

const Tooltip = ({ children }: Props) => {
  return (
    <p className="absolute left-1/2 top-8 flex -translate-x-1/2 scale-0 items-center gap-1 whitespace-nowrap rounded bg-black/95 px-2 py-1 text-xs shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 sm:top-10 sm:text-sm">
      {children}
    </p>
  );
};

export default Tooltip;
