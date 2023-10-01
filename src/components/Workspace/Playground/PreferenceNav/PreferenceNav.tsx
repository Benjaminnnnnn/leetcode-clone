import ButtonWithTooltip from "@/components/Button/ButtonWithTooltip";
import { useEffect, useState } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";

type Props = {};

const PreferenceNav = (props: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleKeyFullScreen = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        toggleFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyFullScreen);
    return () => document.removeEventListener("keydown", handleKeyFullScreen);
  }, []);

  return (
    <>
      <div className="bg-dark-layer-1 flex h-11 w-full items-center justify-between">
        <div className="flex items-center px-2 text-white">
          <button className="bg-dark-layer-2 rounded px-2 py-1.5 text-xs font-medium">
            JavaScript
          </button>
        </div>

        <div className="m-2 flex items-center text-white">
          <ButtonWithTooltip tooltip={{ text: "Settings" }}>
            <AiOutlineSetting></AiOutlineSetting>
          </ButtonWithTooltip>

          <ButtonWithTooltip
            tooltip={{
              text: !isFullScreen ? "Enter Full Screen" : "Exit Full Screen",
              options: { alignment: "left" },
              keyboardNavigation: ["Ctrl", "Shift", "F"],
            }}
            onClick={toggleFullScreen}
          >
            {!isFullScreen ? (
              <AiOutlineFullscreen></AiOutlineFullscreen>
            ) : (
              <AiOutlineFullscreenExit></AiOutlineFullscreenExit>
            )}
          </ButtonWithTooltip>
        </div>
      </div>
    </>
  );
};

export default PreferenceNav;
