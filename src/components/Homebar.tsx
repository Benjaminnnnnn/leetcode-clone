"use client";

import logo from "@/asset/logo.png";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Spinner from "./Loader/Spinner";

type Props = {};

/**
 * This file is a temporary solution to react-redux bug. When used in conjunction
 * with the app router of Next.js, the root route / cannot access redux store.
 */
const Homebar = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  return (
    <div className="w-full border-gray-300 bg-stone-500">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 text-white sm:px-12 md:px-24">
        <Link href="/" className="flex w-10 items-center md:w-14">
          <Image src={logo} alt="leetcode clone logo" />
          <span className="block">LeetCode</span>
        </Link>
        <div className="flex items-center">
          {!loading &&
            (!user ? (
              <Link href="/auth">
                <button className="rounded-xl px-4 py-2 font-medium transition-all duration-100 ease-in-out hover:bg-stone-400">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-medium transition-all duration-100 ease-in-out hover:bg-stone-400 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={signOut}
                disabled={signOutLoading}
              >
                {signOutLoading && <Spinner></Spinner>}
                Sign Out
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homebar;
