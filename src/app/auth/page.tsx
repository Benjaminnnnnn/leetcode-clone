"use client";
// import code from "@/asset/auth/code.svg";
import code from "@/asset/auth/code_2.png";
import AuthModal from "@/components/Modal/AuthModal";
import Navbar from "@/components/Navbar";
import { auth } from "@/firebase/firebase";
import { selectOpen, signup } from "@/redux/features/auth/authSlice";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const informationContainerStyles =
    "flex items-center justify-center bg-white h-96 sm:h-full";
  const informationStyles =
    "flex max-w-sm flex-col gap-6 px-10 text-center sm:text-left items-center sm:items-start";

  const isOpen = useSelector(selectOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [user, router]);

  // disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  if (user) {
    return (
      <>
        <p className="px-4 py-2">User already signed in. Redirecting...</p>
      </>
    );
  }

  return (
    <>
      <div className={`bg-neutral-700} w-screen`}>
        <div className="mx-auto flex min-h-screen flex-col">
          <Navbar></Navbar>
          <div className="mx-auto grid w-full flex-1 grid-rows-3 sm:grid-flow-dense sm:grid-cols-2 sm:grid-rows-2">
            <div className="pointer-events-none hidden select-none items-center justify-center bg-neutral-700 sm:flex">
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
                  className="-scale-x-100 rounded-[60px]"
                ></Image>
              </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 bg-neutral-700 sm:col-start-2 sm:col-end-3  sm:gap-6">
              <h1 className="text-xl font-medium text-white sm:text-2xl md:text-4xl">
                Learn through Code
              </h1>
              <p className="text-xs font-medium text-gray-400 sm:text-sm md:text-base">
                Get you ready to work.
              </p>
              <button
                className="inline-flex items-center gap-1 rounded-3xl bg-teal-600 px-4 py-2 text-white outline-none transition-all active:bg-teal-800 active:shadow-inner"
                onClick={() => {
                  dispatch(signup());
                }}
              >
                Create Account
                <AiOutlineRight></AiOutlineRight>
              </button>
            </div>

            <div className={informationContainerStyles}>
              <div className={informationStyles}>
                <h1 className="text-xl font-medium text-blue-500  sm:text-3xl md:text-3xl">
                  Questions
                </h1>
                <p className="text-gray-400">
                  Join the community and gain access to over 200 best coding
                  interview questions. Be active, be prepared, and practice now.
                  Chanllegene yourself and learn through quesitions, not through
                  paper. Ace your technical interview with our community right
                  now.
                </p>

                <button className="inline-flex items-center gap-1 text-blue-500 hover:text-cyan-500">
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
                <p className="text-gray-400">
                  Not only does LeetCode prepare candidates for technical
                  interviews, we also provide industrial opportunities. We
                  identify top technical talent from contests to online
                  assessments. You can directly start top companies' interview
                  process here.
                </p>
                <button className="inline-flex items-center gap-1 text-blue-500 hover:text-cyan-400">
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
