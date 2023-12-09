"use client";

import logo from "@/asset/logo.png";
import { auth } from "@/firebase/firebase";
import { problems } from "@/mock-data/problems";
import { login } from "@/redux/features/auth/authSlice";
import { resetTestCaseResults } from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiListFill } from "react-icons/pi";
import ButtonWithTooltip from "../Button/ButtonWithTooltip";
import Timer from "../Timer/Timer";
import Logout from "./Logout";

type Props = {
  problemId?: string;
};

/**
 * Navbar component is an extended component on top of AuthNavbar.
 * This component has more functionalities.
 */
const Navbar = ({ problemId }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [problemIndex, setProblemIndex] = useState(
    problems.findIndex((p) => p.id === problemId),
  );

  const handlePreviousProblem = () => {
    if (problemId && problemIndex > 0) {
      setProblemIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextProblem = () => {
    if (problemId && problemIndex < problems.length - 1) {
      setProblemIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key in ["h", "j", "k"]) {
        e.preventDefault();
      }
      switch (e.key) {
        case "h":
          router.push("/");
          break;
        case "j":
          handlePreviousProblem();
          break;
        case "k":
          handleNextProblem();
          break;
      }
    }
  };

  useEffect(() => {
    if (problemId) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  useEffect(() => {
    if (problemId) {
      dispatch(resetTestCaseResults());
      router.push(`/problems/${problems[problemIndex].id}`);
    }
  }, [problemIndex, router, dispatch, problemId]);

  return (
    <div className="w-full bg-stone-500">
      {/* // <div className="w-full border-b border-gray-400 bg-dark-layer-1"> */}
      <div
        className={`mx-auto flex ${
          !problemId &&
          "max-w-screen-2xl sm:px-12 sm:text-base md:px-24 2xl:px-12"
        } items-center justify-between px-4 py-2 text-sm font-medium text-white`}
      >
        <Link href="/" className="relative flex items-center">
          <Image
            className="w-10 md:w-12"
            src={logo}
            alt="leetcode clone logo"
          />
          <span className="hidden sm:block">LeetCode</span>
        </Link>

        {/* <Link href="/playground" className="relative flex items-center">
          <span className="">Playground</span>
        </Link> */}

        {problemId && (
          <div className="hidden items-center justify-center gap-1 sm:flex">
            <ButtonWithTooltip
              tooltip={{
                text: "Previous Question",
                keyboardNavigation: ["Ctrl", "J"],
              }}
              disabled={problemIndex <= 0}
              onClick={handlePreviousProblem}
            >
              <FaChevronLeft></FaChevronLeft>
            </ButtonWithTooltip>

            <Link href="/">
              <ButtonWithTooltip
                tooltip={{
                  text: "Problem List",
                  keyboardNavigation: ["Ctrl", "H"],
                }}
              >
                <PiListFill></PiListFill>
                <p>Problem List</p>
              </ButtonWithTooltip>
            </Link>

            <ButtonWithTooltip
              tooltip={{
                text: "Next Question",
                keyboardNavigation: ["Ctrl", "K"],
              }}
              disabled={problemIndex >= problems.length - 1}
              onClick={handleNextProblem}
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
              <div className="flex cursor-pointer items-center gap-1 text-xl sm:gap-2 sm:text-2xl">
                {problemId && <Timer></Timer>}
                <Link href="/profile">
                  <ButtonWithTooltip
                    tooltip={{
                      text: user.email as string,
                      options: {
                        position: "loose",
                      },
                    }}
                  >
                    <CgProfile></CgProfile>
                  </ButtonWithTooltip>
                </Link>
                <Logout></Logout>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
