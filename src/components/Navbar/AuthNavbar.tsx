import logo from "@/asset/logo.png";
import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";

type Props = {};

/**
 * AuthNavBar is similar to the normal Navbar with less functionalities.
 * It basically shows the website icon and a login button.
 */
const AuthNavBar = ({}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto w-full bg-stone-500">
      <div className="mx-auto flex items-center justify-between px-4 py-2 text-sm text-white sm:px-12 sm:text-base md:px-24 2xl:px-12">
        <Link href="/" className="relative flex items-center">
          <Image
            className="w-10 md:w-12"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="hidden sm:block">LeetCode</span>
        </Link>
        <div className="flex items-center">
          <button
            className="rounded-xl px-4 py-2 font-medium transition-all duration-100 ease-in-out hover:bg-stone-400"
            onClick={() => {
              dispatch(login());
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavBar;
