import useHasMounted from "@/hooks/useHasMounted";
import { createPortal } from "react-dom";

type Props = {};

const PlaygroundSetting = (props: Props) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return createPortal(
    <div className="z-999 fixed inset-0 bg-black/50">
      <div className="mx-auto text-white">test</div>
    </div>,
    document.getElementById("portal") as HTMLElement,
  );
};

export default PlaygroundSetting;
