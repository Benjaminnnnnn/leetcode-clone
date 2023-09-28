"use client";

import logo from "@/asset/logo.png";
import { auth } from "@/firebase/firebase";
import { login } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiListFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import ButtonWithTooltip from "../Button/ButtonWithTooltip";
import Logout from "./Logout";

type Props = {
  problem?: string;
};

/**
 * This file is a temporary solution to react-redux bug. When used in conjunction
 * with the app router of Next.js, the root route / cannot access redux store.
 */
const Homebar = ({ problem }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [problemIndex, setProblemIndex] = useState(0);

  console.log(problem);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
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
      <div
        className={`mx-auto flex ${
          !problem && "max-w-screen-2xl"
        } items-center justify-between px-4 py-2 text-sm font-medium text-white sm:px-12 sm:text-base md:px-24 2xl:px-12`}
      >
        <Link href="/" className="relative flex items-center">
          <Image
            className="w-10 md:w-12"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="block">LeetCode</span>
        </Link>

        {problem && (
          <div className="flex items-center justify-center gap-1">
            <ButtonWithTooltip
              tooltip={{
                text: "Previous Question",
                keyboardNavigation: ["Ctrl", "J"],
              }}
            >
              <FaChevronLeft></FaChevronLeft>
            </ButtonWithTooltip>

            <ButtonWithTooltip
              tooltip={{
                text: "Problem List",
                keyboardNavigation: ["Ctrl", "H"],
              }}
            >
              <PiListFill></PiListFill>
              <p>Problem List</p>
            </ButtonWithTooltip>

            <ButtonWithTooltip
              tooltip={{
                text: "Next Question",
                keyboardNavigation: ["Ctrl", "K"],
              }}
            >
              <FaChevronRight></FaChevronRight>
            </ButtonWithTooltip>
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
                <ButtonWithTooltip tooltip={{ text: user.email as string }}>
                  <CgProfile></CgProfile>
                </ButtonWithTooltip>
                <Logout></Logout>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homebar;
