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
  const [video, setVideo] = useState({
    isOpen: false,
    videoId: "",
  });

  const closeVideo = () => {
    setVideo((prevVideo) => ({ ...prevVideo, isOpen: false }));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // disable scroll when modal is open
  useEffect(() => {
    if (video.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [video.isOpen]);

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
                idx % 2 == 1 && "bg-dark-layer-3"
              } bg-dark-layer-2 text-white`}
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
                      setVideo({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      });
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
      {video.isOpen && (
        <tfoot
          className="fixed inset-0 flex items-center justify-center bg-black/70"
          // onClick={closeVideo}
        >
          <div className="hd:w-2/5 relative flex h-screen w-full flex-col justify-center gap-2 md:w-1/2">
            <IoMdClose
              className="h-8 w-8 cursor-pointer self-end text-white"
              onClick={closeVideo}
            ></IoMdClose>

            <YouTube
              videoId={video.videoId}
              loading="lazy"
              className="aspect-video"
              iframeClassName="w-full h-full"
            ></YouTube>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsTableBody;
