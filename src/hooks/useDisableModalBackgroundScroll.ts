import { useEffect } from "react";

/**
 * disable backgorund scroll when a modal is open
 */
export const useDisableModalBackgroundScroll = (opened: boolean) => {
  useEffect(() => {
    if (opened) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [opened]);
};
