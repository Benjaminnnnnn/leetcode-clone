import useHasMounted from "@/hooks/useHasMounted";
import { toggleSettingsModal } from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ISettings } from "../Workspace/Playground/Playground";

type Props = {
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
};

const PlaygroundSetting = ({ setSettings, settings }: Props) => {
  const hasMounted = useHasMounted();
  const dispatch = useAppDispatch();

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("fontSize", e.target.value);
    setSettings((prevSettings) => ({
      ...prevSettings,
      fontSize: e.target.value,
    }));
  };

  const closeSettingsModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(toggleSettingsModal(false));
  };

  if (!hasMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      onClick={closeSettingsModal}
    >
      <div
        className="absolute left-1/2 top-1/2 z-50 mx-auto flex aspect-square h-1/2 max-h-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-dark-layer-3 p-4 text-gray-200 shadow-xl"
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
        <div className="flex flex-col">
          <div className="mt-2 flex items-center gap-4">
            <label
              htmlFor="editor-font-size"
              className="block whitespace-nowrap text-sm font-medium"
            >
              Font Size: {settings.fontSize}px
            </label>
            <input
              id="editor-font-size"
              type="range"
              min="10"
              max="32"
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            ></input>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement,
  );
};

export default PlaygroundSetting;
