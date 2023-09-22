import logo from "@/asset/logo.png";
import { login } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

type Props = {};

const Navbar = ({}: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-stone-500">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 text-white sm:px-12 md:px-24">
        <Link href="/" className="flex w-10 items-center md:w-14">
          <Image src={logo} alt="leetcode clone logo" />
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
