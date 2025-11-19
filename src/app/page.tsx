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
  const [seeding, setSeeding] = useState(false);
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

  // Temporary seeding helper for new problems
  const seedProblems = async () => {
    if (seeding) return;
    setSeeding(true);
    try {
      const newProblems = [
        {
          id: "container-with-most-water",
          title: "Container With Most Water",
          difficulty: "Medium",
          category: "Two Pointers",
          order: 6,
          videoId: "UuiTKBwPgAo",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "merge-intervals",
          title: "Merge Intervals",
          difficulty: "Medium",
          category: "Intervals",
          order: 7,
          videoId: "44H3cEC2fFM",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "maximum-depth-of-binary-tree",
          title: "Maximum Depth of Binary Tree",
          difficulty: "Easy",
          category: "Tree",
          order: 8,
          videoId: "hTM3phVI6YQ",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "best-time-to-buy-and-sell-stock",
          title: "Best Time to Buy and Sell Stock",
          difficulty: "Easy",
          category: "Array",
          order: 9,
          videoId: "1pkOgXD63yU",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "subsets",
          title: "Subsets",
          difficulty: "Medium",
          category: "Backtracking",
          order: 10,
          videoId: "REOH22Xwdkk",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "product-of-array-except-self",
          title: "Product of Array Except Self",
          difficulty: "Medium",
          category: "Array",
          order: 11,
          videoId: "bNvIQI2wAjk",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "contains-duplicate",
          title: "Contains Duplicate",
          difficulty: "Easy",
          category: "Hash Table",
          order: 12,
          videoId: "3OamzN90kPg",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "binary-search",
          title: "Binary Search",
          difficulty: "Easy",
          category: "Binary Search",
          order: 13,
          videoId: "s4DPM8ct1pI",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "climbing-stairs",
          title: "Climbing Stairs",
          difficulty: "Easy",
          category: "Dynamic Programming",
          order: 14,
          videoId: "Y0lT9Fck7qI",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "longest-substring-without-repeating-characters",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          category: "Sliding Window",
          order: 15,
          videoId: "wiGpQwVHdE0",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "maximum-subarray",
          title: "Maximum Subarray",
          difficulty: "Medium",
          category: "Array",
          order: 16,
          videoId: "5WZl3MMT0Eg",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "number-of-islands",
          title: "Number of Islands",
          difficulty: "Medium",
          category: "Graph",
          order: 17,
          videoId: "pV2kpPD66nE",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "3sum",
          title: "3Sum",
          difficulty: "Medium",
          category: "Two Pointers",
          order: 18,
          videoId: "onLoX6Nhvmg",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "linked-list-cycle",
          title: "Linked List Cycle",
          difficulty: "Easy",
          category: "Linked List",
          order: 19,
          videoId: "gBTe7lFR3vc",
          likes: 0,
          dislikes: 0,
        },
        {
          id: "invert-binary-tree",
          title: "Invert Binary Tree",
          difficulty: "Easy",
          category: "Tree",
          order: 20,
          videoId: "OnSn2XEQ4MY",
          likes: 0,
          dislikes: 0,
        },
      ];

      await Promise.all(
        newProblems.map((p) => setDoc(doc(firestore, "problems", p.id), p)),
      );
      toast.success("Seeded problems into Firestore.", toastConfig);
    } catch (error) {
      console.error("Failed to seed problems", error);
      toast.error("Failed to seed problems. Check console for details.", toastConfig);
    } finally {
      setSeeding(false);
    }
  };

  const showSeedButton = process.env.NEXT_PUBLIC_ENABLE_SEED === "true";

  return (
    <>
      {/* <main className="min-h-screen w-screen bg-neutral-700"> */}
      <main className="min-h-screen w-screen">
        <Navbar></Navbar>

        <div className="relative mx-auto flex max-w-screen-2xl overflow-x-auto py-4 sm:px-6 sm:py-10">
          {showSeedButton && (
            <div className="absolute right-4 top-2 flex gap-2">
              <button
                className="rounded-md border px-3 py-1 text-xs transition hover:bg-accent hover:text-accent-foreground"
                disabled={seeding}
                onClick={seedProblems}
              >
                {seeding ? "Seeding..." : "Seed problems"}
              </button>
            </div>
          )}
          {loadingProblems ? (
            <ProblemsSkeleton></ProblemsSkeleton>
          ) : (
            <table className="mx-auto w-full text-left text-sm sm:w-4/5">
              <thead className="text-xs font-medium uppercase text-muted-foreground">
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
