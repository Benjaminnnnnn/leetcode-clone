"use client";
import { problems } from "@/mock-data/problems";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiFileVideoLine } from "react-icons/ri";
import YouTube from "react-youtube";

type Props = {};

const ProblemsTableBody = (props: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState("");

  // disable scroll when modal is open
  useEffect(() => {
    if (showVideo) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showVideo]);

  return (
    <>
      <tbody>
        {problems.map((problem, idx) => {
          const difficulty = problem.difficulty.toLocaleLowerCase();
          const difficultyColor =
            difficulty === "easy"
              ? "text-teal-500"
              : difficulty === "medium"
              ? "text-yellow-500"
              : "text-red-500";

          return (
            <tr
              className={`${
                idx % 2 == 1 && "bg-neutral-600"
              } border-b border-neutral-700 text-white`}
              key={problem.id}
            >
              <th className="whitespace-nowrap px-4 py-4 text-green-500">
                <BsCheckCircle className="text-lg"></BsCheckCircle>
              </th>
              <td className="px-6 py-4">
                <Link
                  href={`/problems/${problem.id}`}
                  className="cursor-pointer whitespace-nowrap hover:text-blue-600"
                >
                  {`${idx + 1}. `}
                  {problem.title}
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {problem.category}
              </td>
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className="px-4 py-4">
                {problem.videoId ? (
                  <RiFileVideoLine
                    className="cursor-pointer text-xl text-purple-500"
                    onClick={() => {
                      setShowVideo(true);
                      setVideoId(problem.videoId!);
                    }}
                  ></RiFileVideoLine>
                ) : (
                  <p className="whitespace-nowrap">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {/* youtube video modal */}
      {showVideo && (
        <tfoot
          className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black/70"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative flex h-screen w-3/5 flex-col justify-center gap-2">
            <IoMdClose className="h-8 w-8 cursor-pointer self-end text-white"></IoMdClose>
            <YouTube
              videoId={videoId}
              loading="lazy"
              iframeClassName="w-full aspect-video"
            ></YouTube>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsTableBody;
