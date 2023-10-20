import {
  selectTestCaseIsExpanded,
  toggleTestCase,
} from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

type Props = {
  handleSubmit: () => void;
};

const EditorFooter = ({ handleSubmit }: Props) => {
  //  TODO: need to fix absolute position covering test case text style
  const dispatch = useAppDispatch();
  const testCaseIsExpanded = useAppSelector(selectTestCaseIsExpanded);
  const buttonStyles =
    "px-4 py-1.5 font-medium items-center transition-all inline-flex rounded-lg text-sm";

  return (
    <div className="z-100 absolute bottom-0 mx-auto flex w-full shrink-0 flex-nowrap items-center justify-between gap-2 overflow-x-auto bg-dark-layer-2 p-2 text-white">
      <button
        className={`${buttonStyles} flex items-center gap-0.5 bg-white/10 hover:bg-stone-500`}
        onClick={() => {
          dispatch(toggleTestCase(!testCaseIsExpanded));
        }}
      >
        Console
        <span
          className={`text-xl ${
            testCaseIsExpanded && "rotate-180"
          } transition-all duration-300`}
        >
          <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
        </span>
      </button>
      <div className="flex items-center gap-2">
        <button
          className={`${buttonStyles} bg-white/10 hover:bg-stone-500`}
          onClick={handleSubmit}
        >
          Run
        </button>
        <button
          className={`${buttonStyles} bg-green-500 hover:bg-green-700`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditorFooter;
