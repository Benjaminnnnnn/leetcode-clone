import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
// import { MdOutlineLogout } from "react-icons/md";
import Spinner from "./Loader/Spinner";

type Props = {};

const Logout = (props: Props) => {
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  return (
    <button
      className="inline-flex w-full items-center justify-center rounded-xl p-2 text-sm font-medium transition-all duration-100 ease-in-out hover:bg-stone-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
      onClick={signOut}
      disabled={signOutLoading}
    >
      {signOutLoading && <Spinner></Spinner>}
      {/* <MdOutlineLogout></MdOutlineLogout> */}
      Sign Out
    </button>
  );
};

export default Logout;
