import { useState } from "react";
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
  const [time, setTime] = useState(600);

  const toggleTimer = () => {
    console.log("clicked");
    setShowTimer((prevTimer) => !prevTimer);
  };

  return (
    <>
      <ButtonWithTooltip
        tooltip={{ text: "Toggle timer" }}
        className="rounded hover:bg-stone-400 max-sm:hidden"
        onClick={toggleTimer}
      >
        {showTimer ? (
          <div className="flex cursor-pointer items-center gap-2 rounded py-2 text-sm sm:text-base">
            <p>{formatTime(time)}</p>
            <FiRefreshCcw></FiRefreshCcw>
          </div>
        ) : (
          <IoTimerOutline></IoTimerOutline>
        )}
      </ButtonWithTooltip>
    </>
  );
};

export default Timer;
