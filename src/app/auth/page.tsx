"use client";
import code from "@/asset/auth/code_2.png";
import AuthModal from "@/components/Modal/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import { useDisableModalBackgroundScroll } from "@/hooks/useDisableModalBackgroundScroll";
import { cn } from "@/lib/utils";
import { selectOpen, signup } from "@/redux/features/auth/authSlice";
import { selectTheme } from "@/redux/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineRight } from "react-icons/ai";

const Auth = () => {
  const informationContainerStyles =
    "flex h-96 items-center justify-center rounded-lg shadow border sm:h-full";
  const informationStyles =
    "flex max-w-sm flex-col items-center gap-6 px-10 text-center sm:items-start sm:text-left";

  const isOpen = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [user] = useAuthState(auth);

  useDisableModalBackgroundScroll(isOpen);
  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user, router]);

  // disable scroll when modal is open
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add("overflow-y-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-y-hidden");
  //   }
  //   return () => {
  //     document.body.classList.remove("overflow-y-hidden");
  //   };
  // }, [isOpen]);

  // if (user && !loading) {
  //   return (
  //     <>
  //       <p className="px-4 py-2">User already signed in. Redirecting...</p>
  //     </>
  //   );
  // }

  const theme = useAppSelector(selectTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <div className="fixed inset-0 -z-10 hidden qhd:block"></div>
      <div className={`w-screen`}>
        <div className="mx-auto flex min-h-screen max-w-screen-qhd flex-col">
          <Navbar></Navbar>
          <div className="mx-auto grid w-full flex-1 grid-rows-3 gap-2 p-2 sm:grid-flow-dense sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 sm:p-4">
            <div
              className={cn(
                informationContainerStyles,
                "pointer-events-none hidden select-none sm:flex",
              )}
            >
              <motion.div
                animate={{ y: [0, 12, 0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  ease: "easeInOut",
                  duration: 10,
                }}
                className="relative z-0 w-[70%] max-w-lg"
              >
                <Image
                  src={code}
                  alt="coding logo"
                  height={400}
                  width={400}
                  className="-scale-x-100 rounded-[60px]"
                ></Image>
              </motion.div>
            </div>
            <div
              className={cn(
                informationContainerStyles,
                "relative flex flex-col gap-4 sm:col-start-2 sm:col-end-3 sm:gap-6",
              )}
            >
              {/* <div className="absolute -z-10 mx-auto">
                <Image
                  src={code_snippet}
                  alt="Golang code snippet"
                  height={400}
                  width={400}
                ></Image>
              </div> */}
              <h1 className="bg-gradient-primary bg-clip-text text-xl font-medium text-transparent sm:text-2xl md:text-4xl">
                Learn through Code
              </h1>
              <p className="text-xs font-medium  sm:text-sm md:text-base">
                Get you ready to work.
              </p>

              <div className="bg-gradient-primary rounded-xl p-0.5">
                <button
                  className="inline-flex w-full items-center gap-1 rounded-[10px] bg-background px-4 py-2 transition-all hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    dispatch(signup());
                  }}
                >
                  Create Account
                  <AiOutlineRight></AiOutlineRight>
                </button>
              </div>
            </div>

            <div className={informationContainerStyles}>
              <div className={informationStyles}>
                <h1 className="text-xl font-medium text-blue-500 sm:text-3xl md:text-3xl">
                  Questions
                </h1>
                <p>
                  Join the community and gain access to over 200 best coding
                  interview questions. Be active, be prepared, and practice now.
                  Chanllegene yourself and learn through quesitions, not through
                  paper. Ace your technical interview with our community right
                  now.
                </p>

                <button className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600">
                  View Questions
                  <AiOutlineRight></AiOutlineRight>
                </button>
              </div>
            </div>

            <div className={informationContainerStyles}>
              <div className={informationStyles}>
                <h1 className="text-xl font-medium text-yellow-700 sm:text-3xl md:text-3xl">
                  Opprtunities
                </h1>
                <p>
                  Not only does LeetCode prepare candidates for technical
                  interviews, we also provide industrial opportunities. We
                  identify top technical talent from contests to online
                  assessments. You can directly start top companies&apos;
                  interview process here.
                </p>
                <button className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600">
                  Browse Opportunities
                  <AiOutlineRight></AiOutlineRight>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && <AuthModal></AuthModal>}
      </div>
    </>
  );
};

export default Auth;
