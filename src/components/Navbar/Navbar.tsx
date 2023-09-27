import logo from "@/asset/logo.png";
import { login } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

type Props = {};

const Navbar = ({}: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="mx-auto w-full max-w-screen-2xl bg-stone-500">
      <div className="mx-auto flex items-center justify-between px-4 py-2 text-sm text-white sm:px-12 sm:text-base md:px-24 2xl:px-12">
        <Link href="/" className="relative flex items-center">
          <Image
            className="w-10 md:w-12"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="block">LeetCode</span>
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

export default Navbar;
