"use client";

import logo from "@/asset/logo.png";
import { auth } from "@/firebase/firebase";
import { login } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiListFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import Tooltip from "../Tooltip";
import KeyButton from "./KeyButton";
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
  const router = useRouter();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case "h":
          router.push("/");
          break;
        case "j":
          console.log("ctrl+j");
          break;
        case "k":
          console.log("ctrl+k");
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="w-full border-gray-300 bg-stone-500">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 text-sm font-medium text-white sm:px-12 sm:text-base md:px-24">
        <Link href="/" className="relative flex items-center">
          <Image
            className="w-10 md:w-14"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="block">LeetCode</span>
        </Link>

        {problemPage && (
          <div className="flex items-center justify-center gap-1">
            <button className="group relative flex items-center gap-1 px-2 py-1">
              <FaChevronLeft></FaChevronLeft>
              <Tooltip>
                Previous Question <KeyButton keys={["Ctrl", "j"]}></KeyButton>
              </Tooltip>
            </button>

            <button className="group relative flex items-center gap-1 px-2 py-1">
              <PiListFill></PiListFill>
              <p>Problem List</p>
              <Tooltip>
                Problem List <KeyButton keys={["Ctrl", "h"]}></KeyButton>
              </Tooltip>
            </button>

            <button className="group relative flex items-center px-2 py-1">
              <FaChevronRight></FaChevronRight>
              <Tooltip>
                Next Question <KeyButton keys={["Ctrl", "k"]}></KeyButton>
              </Tooltip>
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
                  <Tooltip>{user.email}</Tooltip>
                </button>
                <Logout></Logout>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homebar;
