type Props = {};

const EditorFooter = (props: Props) => {
  const buttonStyles =
    "px-4 py-1.5 font-medium items-center transition-all inline-flex rounded-lg text-sm";

  return (
    <div className="bg-dark-layer-2 z-10 flex w-full shrink-0 flex-nowrap items-center justify-between gap-2 pb-2 text-white ">
      <button className={`${buttonStyles} bg-white/10 hover:bg-stone-500`}>
        Console
      </button>
      <div className="flex items-center gap-2">
        <button className={`${buttonStyles} bg-white/10 hover:bg-stone-500`}>
          Run
        </button>
        <button className={`${buttonStyles} bg-green-500 hover:bg-green-700`}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditorFooter;
