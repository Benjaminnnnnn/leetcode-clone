import useHasMounted from "@/hooks/useHasMounted";
import { toggleSettingsModal } from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  fontSize: string;
  formatOnType: string;
  showMinimap: string;
  setFontSize: Dispatch<SetStateAction<string>>;
  setFormatOnType: Dispatch<SetStateAction<string>>;
  setShowMinimap: Dispatch<SetStateAction<string>>;
};

const PlaygroundSetting = ({
  fontSize,
  formatOnType,
  showMinimap,
  setFontSize,
  setFormatOnType,
  setShowMinimap,
}: Props) => {
  const hasMounted = useHasMounted();
  const dispatch = useAppDispatch();

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(e.target.value);
  };
  const handleFormatOnTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormatOnType(e.target.checked ? "true" : "false");
  };
  const handleShowMinimapChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowMinimap(e.target.checked ? "true" : "false");
  };

  const closeSettingsModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleSettingsModal(false));
  };

  if (!hasMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-muted/50"
      onClick={closeSettingsModal}
    >
      <div
        className="absolute left-1/2 top-1/2 z-50 mx-auto flex aspect-square
        h-1/2 max-h-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl
        bg-popover p-4 shadow-xl"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between border-b border-gray-200 pb-1 ">
          <h1 className="font-semibold">Editor Settings</h1>
          <button onClick={closeSettingsModal}>
            <AiOutlineClose className="text-xl"></AiOutlineClose>
          </button>
        </div>

        {/* body */}
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="editor-font-size"
              className="flex flex-col whitespace-nowrap text-sm"
            >
              <span className="font-medium">Font Size {fontSize}px</span>
              <span className="text-xs">Set code editor font size</span>
            </label>
            <input
              id="editor-font-size"
              type="range"
              min="10"
              max="32"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="h-1 w-2/5 cursor-pointer appearance-none rounded-lg bg-popover-foreground"
            ></input>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="editor-format-on-type"
              className="flex flex-col whitespace-nowrap text-sm"
            >
              <span className="font-medium">Format on Type</span>
              <span className="text-xs">Format your code when you type</span>
            </label>
            <input
              id="editor-format-on-type"
              type="checkbox"
              checked={formatOnType === "true" ? true : false}
              onChange={handleFormatOnTypeChange}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-gray-600"
            ></input>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="editor-show-minimap"
              className="flex flex-col whitespace-nowrap text-sm"
            >
              <span className="font-medium">Show Minimap</span>
              <span className="text-xs">
                Display minimap for your code editor
              </span>
            </label>
            <input
              id="editor-show-minimap"
              type="checkbox"
              checked={showMinimap === "true" ? true : false}
              onChange={handleShowMinimapChange}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-gray-600"
            ></input>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement,
  );
};

export default PlaygroundSetting;
