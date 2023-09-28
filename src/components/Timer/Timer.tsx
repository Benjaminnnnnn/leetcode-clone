import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTimerOutline } from "react-icons/io5";

type Props = {};

const Timer = (props: Props) => {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      {showTimer ? (
        <div className="flex cursor-pointer items-center gap-2 rounded py-2 text-sm sm:text-base">
          <p>00:10:12</p>
          <FiRefreshCcw></FiRefreshCcw>
        </div>
      ) : (
        <IoTimerOutline></IoTimerOutline>
      )}
    </>
  );
};

export default Timer;
