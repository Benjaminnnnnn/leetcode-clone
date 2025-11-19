"use client";

import { FaMoon, FaSun } from "react-icons/fa";

import logo from "@/asset/logo.png";
import logo_black from "@/asset/logo_black.png";
import { auth } from "@/firebase/firebase";
import { problems } from "@/mock-data/problems";
import { login } from "@/redux/features/auth/authSlice";
import { selectTheme } from "@/redux/features/theme/themeSlice";
import { toggleThemeThunk } from "@/redux/features/theme/themeThunks";
import { resetTestCaseResults } from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiListFill } from "react-icons/pi";
import ButtonWithTooltip from "../Button/ButtonWithTooltip";
import Timer from "../Timer/Timer";
import Logout from "./Logout";
import NavbarItem from "./NavbarItem";

type Props = {
  problemId?: string;
};

const Navbar = ({ problemId }: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [problemIndex, setProblemIndex] = useState(
    problems.findIndex((p) => p.id === problemId),
  );

  const pathname = usePathname();
  const theme = useAppSelector(selectTheme);

  const handlePreviousProblem = useCallback(() => {
    if (problemId && problemIndex > 0) {
      setProblemIndex((prevIndex) => prevIndex - 1);
    }
  }, [problemId, problemIndex]);

  const handleNextProblem = useCallback(() => {
    if (problemId && problemIndex < problems.length - 1) {
      setProblemIndex((prevIndex) => prevIndex + 1);
    }
  }, [problemId, problemIndex]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (["h", "j", "k"].includes(e.key)) {
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
    },
    [router, handlePreviousProblem, handleNextProblem],
  );

  useEffect(() => {
    if (!problemId) return;
    const listener = (e: KeyboardEvent) => handleKeyPress(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [problemId, handleKeyPress]);

  useEffect(() => {
    if (problemId) {
      dispatch(resetTestCaseResults());
      router.push(`/problems/${problems[problemIndex].id}`);
    }
  }, [problemIndex, router, dispatch, problemId]);

  return (
    // <div className="w-full bg-stone-500">
    <div className="w-full border-b border-accent">
      {/* // <div className="w-full border-b border-gray-400 bg-dark-layer-1"> */}
      <div
        className={clsx(
          {
            "max-w-screen-2xl sm:px-12 sm:text-base md:px-24 2xl:px-12":
              !problemId,
          },
          "mx-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground",
        )}
      >
        <div className="flex  items-center">
          <Link href="/" className="relative mr-8 flex items-center">
            <Image
              className="w-10 md:w-12"
              src={theme === "light" ? logo_black : logo}
              alt="leetcode clone logo"
            />
            <span className="hidden sm:block">LeetCode</span>
          </Link>
          {!problemId && (
            <div className="flex gap-6">
              <NavbarItem to={"/playground"} name={"Playground"} />
            </div>
          )}
        </div>

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

        <div className="flex items-center gap-2 text-sm sm:text-base">
          {!loading && (
            <>
              {/* {pathname !== "/auth" && ( */}
              <button
                className="text-xl text-foreground"
                onClick={() => dispatch(toggleThemeThunk())}
              >
                {theme === "light" ? <FaSun></FaSun> : <FaMoon></FaMoon>}
              </button>
              {/* )} */}
              {!user ? (
                <Link href="/auth">
                  <button
                    className="rounded-xl px-4 py-2 font-medium transition-all
                    duration-100 ease-in-out hover:bg-accent-foreground hover:text-primary-foreground"
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
