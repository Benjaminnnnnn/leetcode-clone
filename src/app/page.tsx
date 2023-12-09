"use client";
import Navbar from "@/components/Navbar/Navbar";
import ProblemsSkeleton from "@/components/Skeleton/ProblemsSkeleton";
import ProblemsTableBody from "@/components/Table/ProblemsTableBody";
import { firestore } from "@/firebase/firebase";
import { useGetProblems } from "@/hooks/useGetProblems";
import { toastConfig } from "@/utils/react-toastify/toast";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    order: 0,
    videoId: "",
    link: "",
    likes: 0,
    dislikes: 0,
  });
  const [loadingProblems, setLoadingProblems] = useState(true);
  // fetch all problems from firestore
  const problems = useGetProblems(setLoadingProblems);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    toast.success("Added a new problem", toastConfig);
  };

  return (
    <>
      <main className="min-h-screen w-screen bg-neutral-700">
        <Navbar></Navbar>

        <div className="relative mx-auto flex max-w-screen-2xl overflow-x-auto py-4 sm:px-6 sm:py-10">
          {loadingProblems ? (
            <ProblemsSkeleton></ProblemsSkeleton>
          ) : (
            <table className="mx-auto w-full text-left text-sm sm:w-4/5">
              <thead className="text-xs font-medium uppercase text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Difficulty
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Solution
                  </th>
                </tr>
              </thead>

              <ProblemsTableBody problems={problems}></ProblemsTableBody>
            </table>
          )}
        </div>

        {/* add problem form & temporary */}
        {/* <form
          className="mx-auto flex max-w-sm flex-col gap-3 p-6"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="problem id"
            name="id"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="title"
            name="title"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="difficulty"
            name="difficulty"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="category"
            name="category"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="order"
            name="order"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="videoId (optional)"
            name="videoId"
          />
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="link (optional)"
            name="link"
          />
          <button className="bg-white">Add a problem</button>
        </form> */}
      </main>
    </>
  );
}
