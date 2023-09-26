"use client";

import logo from "@/asset/logo.png";
import { auth } from "@/firebase/firebase";
import { login } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Logout from "./Logout";

type Props = {
  problemPage?: boolean;
};

/**
 * This file is a temporary solution to react-redux bug. When used in conjunction
 * with the app router of Next.js, the root route / cannot access redux store.
 */
const Homebar = ({ problemPage }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();

  return (
    <div className="w-full border-gray-300 bg-stone-500">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 text-white sm:px-12 md:px-24">
        <Link href="/" className="relative flex items-center ">
          <Image
            className="w-10 md:w-14"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="block">LeetCode</span>
        </Link>

        {problemPage && (
          <div className="flex items-center justify-center gap-4">
            <button className="block">
              <FaChevronLeft></FaChevronLeft>
            </button>

            <button className="block">
              <FaChevronRight></FaChevronRight>
            </button>
          </div>
        )}

        <div className="flex items-center text-sm sm:text-base">
          {!loading &&
            (!user ? (
              <Link href="/auth">
                <button
                  className="rounded-xl px-4 py-2 font-medium transition-all duration-100 ease-in-out hover:bg-stone-400"
                  onClick={() => {
                    dispatch(login());
                  }}
                >
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="flex cursor-pointer items-center gap-1 text-xl sm:gap-2 sm:text-3xl">
                <button className="group relative block">
                  <CgProfile></CgProfile>
                  <p className="absolute left-1/2 top-8 -translate-x-1/2 scale-0 rounded bg-black/70 p-1 text-xs shadow-lg transition-all duration-300 ease-in-out group-hover:scale-100 sm:top-10 sm:text-sm">
                    {user.email}
                  </p>
                </button>
                <Logout></Logout>
                {/* <button
                  className="inline-flex w-full items-center justify-center rounded-xl p-2  font-medium transition-all duration-100 ease-in-out hover:bg-stone-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 "
                  onClick={signOut}
                  disabled={signOutLoading}
                >
                  {signOutLoading && <Spinner></Spinner>}
                  Sign Out
                </button> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homebar;
