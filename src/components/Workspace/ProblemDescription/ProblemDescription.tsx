// import * as DOMPurify from "dompurify";
import Spinner from "@/components/Loader/Spinner";
import ProblemDescriptionTabSkeleton from "@/components/Skeleton/ProblemDescriptionTabSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { toastConfig } from "@/utils/react-toastify/toast";
import { DBProblem, Problem } from "@/utils/types/problem";
import { DBUser } from "@/utils/types/users";
import { Transaction, doc, getDoc, runTransaction } from "firebase/firestore";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { toast } from "react-toastify";
import ExampleCard from "./Example/ExampleCard";

type Props = {
  problem: Problem;
};

const ProblemDescription = ({ problem }: Props) => {
  const [user] = useAuthState(auth);
  const { liked, starred, solved, disliked, setData } = useGetUserDataOnProblem(
    problem.id,
  );
  const { currentProblem, loading, difficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = useCallback(
    async (transaction: Transaction) => {
      const userRef = doc(firestore, "users", user!.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);
      return { userDoc, problemDoc, userRef, problemRef };
    },
    [user],
  );

  console.log(liked);

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem.", toastConfig);
      return;
    }

    if (updating) {
      return;
    }

    setUpdating(true);
    // update user data and problem data in both firestore and app state
    await runTransaction(firestore, async (transcation) => {
      console.log("starting transcation");
      const { userRef, problemRef, userDoc, problemDoc } =
        await returnUserDataAndProblemData(transcation);

      if (userDoc.exists() && problemDoc.exists()) {
        const userData = userDoc.data() as DBUser;
        const problemData = problemDoc.data() as DBProblem;
        if (liked) {
          transcation.update(userRef, {
            likedProblems: userData.likedProblems.filter(
              (problemId) => problemId != problem.id,
            ),
          });
          transcation.update(problemRef, {
            likes: problemData.likes - 1,
          });
          setData((prevData) => ({ ...prevData, liked: false }));
          setCurrentProblem((prevProblem) =>
            prevProblem
              ? { ...prevProblem, likes: prevProblem.likes - 1 }
              : undefined,
          );
        } else {
          transcation.update(userRef, {
            likedProblems: [...userData.likedProblems, problem.id],
          });
          transcation.update(problemRef, {
            likes: problemData.likes + 1,
          });
          setData((prevData) => ({ ...prevData, liked: true }));
          setCurrentProblem((prevProblem) =>
            prevProblem
              ? { ...prevProblem, likes: prevProblem.likes + 1 }
              : undefined,
          );
        }
      }
      console.log("ending transcation");
    });

    setUpdating(false);
  };

  return (
    <>
      <div className="overflow-y-auto">
        {/* TAB */}
        <div className="flex h-11 w-full items-end bg-dark-layer-1 text-white">
          <p className="cursor-pointer rounded-t bg-dark-layer-2 px-4 py-2 text-xs">
            Description
          </p>
        </div>

        <div className="flex w-full px-0 py-4">
          <div className="w-full space-y-3 px-4">
            {/* Problem heading */}
            <div className="flex">
              <div className="mr-2 flex-1 whitespace-nowrap text-lg font-medium text-white">
                {problem.title}
              </div>
            </div>

            {/* Difficulty Tab */}
            {!loading && currentProblem ? (
              <div className="flex items-center gap-4">
                <div
                  className={`${difficultyClass} inline-block rounded-xl bg-opacity-[0.15] px-2.5 py-1 text-xs font-medium capitalize`}
                >
                  {currentProblem.difficulty}
                </div>
                {solved && (
                  <div className="cursor-pointer rounded p-2 text-lg text-teal-600 transition-colors duration-200 hover:text-teal-300">
                    <BsCheck2Circle />
                  </div>
                )}
                <div
                  className="group flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  onClick={handleLike}
                >
                  <AiFillLike
                    className={`${
                      liked && "text-blue-500"
                    } group-hover:text-blue-500`}
                  />
                  {updating ? (
                    <Spinner></Spinner>
                  ) : (
                    <p className="text-xs">{currentProblem.likes}</p>
                  )}
                </div>
                <div
                  className="group flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  // onClick={handleLike}
                >
                  <AiFillDislike
                    className={`${
                      disliked && "text-blue-500"
                    } group-hover:text-blue-500`}
                  />
                  {/* {true && <Spinner></Spinner>} */}
                  <p className="text-xs">{currentProblem.dislikes}</p>
                </div>
                <div
                  className="group flex cursor-pointer items-center space-x-0.5 rounded p-1 text-lg text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  // onClick={handleLike}
                >
                  <AiFillStar className={`${starred && "text-yellow-500"}`} />
                </div>
              </div>
            ) : (
              <ProblemDescriptionTabSkeleton
                solved={solved}
              ></ProblemDescriptionTabSkeleton>
            )}

            {/* problem statement */}
            <div className="problem-statement text-sm text-white">
              <div
                className="space-y-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(problem.problemStatement, {
                    ALLOWED_ATTR: ["className"],
                  }),
                }}
              ></div>
            </div>

            {/* Examples */}
            <div>
              {problem.examples.map((example, index) => (
                <ExampleCard
                  key={example.id}
                  index={index}
                  {...example}
                ></ExampleCard>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <p className="text-sm font-medium text-white">Constraints:</p>
              <ul className="ml-5 list-disc text-white">
                <div
                  className="min-w-min space-y-1"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(problem.constraints, {
                      ALLOWED_ATTR: ["className"],
                    }),
                  }}
                ></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem>();
  const [loading, setLoading] = useState(false);
  const [difficultyClass, setDifficultyClass] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      const problemRef = doc(firestore, "problems", problemId);
      const problemDoc = await getDoc(problemRef);
      if (problemDoc.exists()) {
        const problem = {
          id: problemDoc.id,
          ...problemDoc.data(),
        } as DBProblem;
        const difficulty = problem.difficulty.toLowerCase();

        setCurrentProblem(problem);
        setDifficultyClass(
          difficulty === "easy"
            ? "text-teal-300 bg-teal-500"
            : difficulty === "medium"
            ? "text-yellow-500 bg-yellow-500"
            : "text-red-500 bg-red-500",
        );
        setLoading(false);
      } else {
        // shouldn't reach here
        console.log("No such problem id");
      }
    };
    fetchProblem();
  }, [problemId]);

  return { currentProblem, loading, difficultyClass, setCurrentProblem };
}

function useGetUserDataOnProblem(problemId: string) {
  const [user] = useAuthState(auth);
  const initialData = {
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchUserDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = userDoc.data() as DBUser;

        setData({
          liked: likedProblems.includes(problemId),
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };
    if (user) {
      fetchUserDataOnProblem();
    }
    return () => setData(initialData);
  }, [problemId, user]);

  return { ...data, setData };
  // return { ...initialData, setData };
}
