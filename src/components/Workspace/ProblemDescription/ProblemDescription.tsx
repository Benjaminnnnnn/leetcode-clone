type Props = {};

const ProblemDescription = (props: Props) => {
  return (
    <>
      <div className="bg-neutral-700">
        {/* TAB */}
        <div className="flex h-11 w-full items-end overflow-x-hidden text-white">
          <p className="cursor-pointer rounded-t bg-neutral-600 px-3 py-2 text-xs">
            Description
          </p>
        </div>

        <div className="flex overflow-auto px-0 py-4">
          <div className="px-5">
            {/* Problme  */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDescription;
