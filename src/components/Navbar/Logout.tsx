import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
// import { MdOutlineLogout } from "react-icons/md";
import Spinner from "../Loader/Spinner";

type Props = {};

const Logout = (props: Props) => {
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  return (
    <button
      className="inline-flex w-full items-center justify-center
      whitespace-nowrap rounded p-2 text-sm transition-all duration-100
      ease-in-out hover:bg-muted-foreground hover:text-primary-foreground
      disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      onClick={signOut}
      disabled={signOutLoading}
    >
      {signOutLoading && <Spinner></Spinner>}
      Sign Out
    </button>
  );
};

export default Logout;
