import { SyntheticEvent, useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTimerOutline } from "react-icons/io5";
import ButtonWithTooltip from "../Button/ButtonWithTooltip";

type Props = {};

// format seconds into HH:MM:SS
const formatTime = (seconds: number): string => {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};

const Timer = (props: Props) => {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);

  const toggleTimer = () => {
    setShowTimer((prevTimer) => !prevTimer);
  };

  const resetTimer = (e: SyntheticEvent) => {
    e.stopPropagation();
    setShowTimer(false);
    setTime(0);
  };

  const handleKeyToggleTimer = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === "T") {
      toggleTimer();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyToggleTimer);
    return () => window.removeEventListener("keydown", handleKeyToggleTimer);
  }, []);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (showTimer) {
      id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [showTimer]);

  return (
    <>
      <ButtonWithTooltip
        tooltip={{
          text: "Toggle timer",
          keyboardNavigation: ["Shift", "T"],
          options: {
            position: "loose",
          },
        }}
        className="rounded hover:bg-stone-400 max-sm:hidden"
        onClick={toggleTimer}
      >
        {showTimer ? (
          <div className="flex cursor-pointer items-center gap-2 rounded py-2 text-sm sm:text-base">
            <p>{formatTime(time)}</p>
            <div onClick={resetTimer}>
              <FiRefreshCcw></FiRefreshCcw>
            </div>
          </div>
        ) : (
          <IoTimerOutline></IoTimerOutline>
        )}
      </ButtonWithTooltip>
    </>
  );
};

export default Timer;
