"use client";
import { Editor } from "@monaco-editor/react";
import Link from "next/link";
import { IoLogoJavascript, IoLogoPython } from "react-icons/io5";

type Props = {};

const PlaygroundPage = (props: Props) => {
  return (
    <div className="h-full w-full">
      <div className="m-auto">
        <div className="flex">
          <h1 className="mx-auto mt-10 inline-block bg-gradient-primary bg-clip-text py-4 text-5xl font-semibold text-transparent">
            Code Playground
          </h1>
        </div>
        <div className="mx-auto mb-4 flex justify-center gap-6 text-2xl">
          <span>Code</span>
          <span>Learn</span>
          <span>Easy&Fast</span>
        </div>
        <p className="m-auto max-w-[600px]">
          Welcome to our code playground! Choose a language to unleash your
          coding skills. Pick from our selection and dive into the world of
          programming.
        </p>
      </div>
      <div className="mx-auto mt-10 grid min-h-[400px] max-w-3xl grid-cols-2 grid-rows-2 rounded-lg border shadow sm:grid-cols-3 md:grid-cols-4">
        <Link
          href={"/playground/javascript"}
          className="m-8 block rounded-lg border p-4 text-center  hover:border-2 hover:border-blue-600"
        >
          <IoLogoJavascript className="mx-auto h-16 w-16 fill-yellow-400" />
          Javascript
        </Link>
        <Link
          href={"/playground/python"}
          className="m-8 block rounded-lg border p-4 text-center hover:border-2 hover:border-blue-600"
        >
          <IoLogoPython className="mx-auto h-16 w-16 fill-blue-500" />
          Python
        </Link>
      </div>
    </div>
  );
};

export default PlaygroundPage;
