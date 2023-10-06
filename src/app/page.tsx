"use client";
import Homebar from "@/components/Navbar/Homebar";
import ProblemsSkeleton from "@/components/Skeleton/ProblemsSkeleton";
import ProblemsTableBody from "@/components/Table/ProblemsTableBody";
import { firestore } from "@/firebase/firebase";
import { Problem } from "@/mock-data/problems";
import { sleep } from "@/utils/sleep";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    order: "",
    videoId: "",
    link: "",
    likes: 0,
    dislikes: 0,
  });
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loadingProblems, setLoadingProblems] = useState(true);

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
      order: parseInt(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    toast.success("Added a new problem", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      pauseOnFocusLoss: true,
    });
  };

  useEffect(() => {
    const fetchProbelms = async () => {
      setLoadingProblems(true);
      await sleep(10000);
      const problemDocs = await getDocs(collection(firestore, "problems"));
      const data: any[] = [];
      problemDocs.forEach((problemDoc) => {
        data.push(problemDoc.data());
      });
      data.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        } else if (a.order === b.order) {
          return 0;
        } else {
          return 1;
        }
      });
      setProblems(data);
      // setLoadingProblems(false);
    };

    fetchProbelms();
  }, []);

  return (
    <>
      <main className="min-h-screen w-screen bg-neutral-700">
        <Homebar></Homebar>

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
        <form
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
        </form>
      </main>
    </>
  );
}
