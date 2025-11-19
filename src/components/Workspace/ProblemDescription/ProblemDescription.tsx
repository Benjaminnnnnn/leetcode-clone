import ButtonWithTooltip from "@/components/Button/ButtonWithTooltip";
import Spinner from "@/components/Loader/Spinner";
import ProblemDescriptionTabSkeleton from "@/components/Skeleton/ProblemDescriptionTabSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { cn } from "@/lib/utils";
import { selectTheme } from "@/redux/features/theme/themeSlice";
import { selectTestCaseAllPassed } from "@/redux/features/workspace/workspaceSlice";
import { useAppSelector } from "@/redux/hooks";
import { toastConfig } from "@/utils/react-toastify/toast";
import { DBProblem, Problem } from "@/utils/types/problem";
import { DBUser } from "@/utils/types/users";
import clsx from "clsx";
import {
  Transaction,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const { liked, starred, solved, disliked, setUserData } =
    useGetUserDataOnProblem(problem.id);
  const { currentProblem, loading, difficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const [updating, setUpdating] = useState(false);
  const allPassed = useAppSelector(selectTestCaseAllPassed);

  const returnUserDataAndProblemData = useCallback(
    async (transaction: Transaction) => {
      const userRef = doc(firestore, "users", user!.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);
      return { userDoc, problemDoc, userRef, problemRef };
    },
    [user, problem.id],
  );

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
    const newStates = await runTransaction(firestore, async (transaction) => {
      const { userRef, problemRef, userDoc, problemDoc } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        const userData = userDoc.data() as DBUser;
        const problemData = problemDoc.data() as DBProblem;

        if (liked) {
          transaction.update(userRef, {
            likedProblems: userData.likedProblems.filter(
              (problemId) => problemId != problem.id,
            ),
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            likes: problemData.likes - 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              liked: false,
            },
            newProblemState: {
              likes: currentProblem ? currentProblem.likes - 1 : 0,
            },
          };
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userData.likedProblems, problem.id],
            dislikedProblems: userData.dislikedProblems.filter(
              (problemId) => problemId != problem.id,
            ),
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            likes: problemData.likes + 1,
            dislikes: problemData.dislikes - 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              liked: true,
              disliked: false,
            },
            newProblemState: {
              likes: currentProblem ? currentProblem.likes + 1 : 0,
              dislikes: currentProblem ? currentProblem.dislikes - 1 : 0,
            },
          };
        } else {
          transaction.update(userRef, {
            likedProblems: [...userData.likedProblems, problem.id],
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            likes: problemData.likes + 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              liked: true,
            },
            newProblemState: {
              likes: currentProblem ? currentProblem.likes + 1 : 0,
            },
          };
        }
      }
    });

    setUserData((prevUserData) =>
      newStates
        ? { disliked, starred, solved, ...newStates.newUserState }
        : prevUserData,
    );

    setCurrentProblem((prevProblem) =>
      prevProblem
        ? newStates
          ? { ...prevProblem, ...newStates.newProblemState }
          : prevProblem
        : undefined,
    );

    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike a problem.", toastConfig);
      return;
    }

    if (updating) {
      return;
    }

    setUpdating(true);
    // update user data and problem data in both firestore and app state
    const newStates = await runTransaction(firestore, async (transaction) => {
      const { userRef, problemRef, userDoc, problemDoc } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        const userData = userDoc.data() as DBUser;
        const problemData = problemDoc.data() as DBProblem;
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userData.dislikedProblems.filter(
              (problemId) => problemId != problem.id,
            ),
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            dislikes: problemData.dislikes - 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              disliked: false,
            },
            newProblemState: {
              dislikes: currentProblem ? currentProblem.dislikes - 1 : 0,
            },
          };
        } else if (liked) {
          transaction.update(userRef, {
            likedProblems: userData.likedProblems.filter(
              (problemId) => problemId != problem.id,
            ),
            dislikedProblems: [...userData.dislikedProblems, problem.id],
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            likes: problemData.likes - 1,
            dislikes: problemData.dislikes + 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              liked: false,
              disliked: true,
            },
            newProblemState: {
              likes: currentProblem ? currentProblem.likes - 1 : 0,
              dislikes: currentProblem ? currentProblem.dislikes + 1 : 0,
            },
          };
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userData.dislikedProblems, problem.id],
          } satisfies Partial<DBUser>);
          transaction.update(problemRef, {
            dislikes: problemData.dislikes + 1,
          } satisfies Partial<DBProblem>);

          return {
            newUserState: {
              disliked: true,
            },
            newProblemState: {
              dislikes: currentProblem ? currentProblem.dislikes + 1 : 0,
            },
          };
        }
      }
    });

    setUserData((prevUserData) =>
      newStates
        ? { liked, starred, solved, ...newStates.newUserState }
        : prevUserData,
    );

    setCurrentProblem((prevProblem) =>
      prevProblem
        ? newStates
          ? { ...prevProblem, ...newStates.newProblemState }
          : prevProblem
        : undefined,
    );
    setUpdating(false);
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error(
        "You must be logged in to add a problem to favorite list.",
        toastConfig,
      );
      return;
    }

    if (updating) {
      return;
    }

    setUpdating(true);
    const userRef = doc(firestore, "users", user.uid);
    if (starred) {
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setUserData((prevUserData) => ({ ...prevUserData, starred: false }));
    } else {
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setUserData((prevUserData) => ({ ...prevUserData, starred: true }));
    }
    setUpdating(false);
  };

  return (
    <>
      <div className="overflow-y-auto">
        {/* TAB */}
        <div className="flex h-11 w-full items-center border-b border-accent bg-[#cccccc]/20 px-4">
          <p
            className="flex h-full cursor-pointer items-center rounded-t
          border-b-2 border-primary px-4 text-xs font-semibold"
          >
            Description
          </p>
        </div>

        <div className="flex w-full px-0 py-4">
          <div className="w-full space-y-3 px-4">
            {/* Problem heading */}
            <div className="flex">
              <div className="mr-2 flex-1 whitespace-nowrap text-lg font-medium ">
                {problem.title}
              </div>
            </div>

            {/* Difficulty Tab */}
            {!loading && currentProblem ? (
              <div className="flex items-center gap-4">
                <div
                  className={`${difficultyClass} inline-flex items-center
                  rounded-xl bg-opacity-[0.15] px-3 py-1 text-xs font-medium
                  capitalize`}
                >
                  {currentProblem.difficulty}
                </div>
                {(solved || allPassed) && (
                  <div
                    className="cursor-pointer rounded p-2 text-lg
                  text-teal-600 transition-colors duration-200
                  hover:text-teal-300"
                  >
                    <BsCheck2Circle />
                  </div>
                )}
                <div
                  className="group flex cursor-pointer items-center space-x-0.5
                  rounded p-1 text-lg text-muted-foreground transition-colors
                  duration-200"
                  onClick={handleLike}
                >
                  <AiFillLike
                    className={clsx(
                      {
                        "text-blue-500": liked,
                      },
                      "group-hover:text-primary",
                    )}
                  />
                  {updating ? (
                    <Spinner></Spinner>
                  ) : (
                    <p className="text-xs">{currentProblem.likes}</p>
                  )}
                </div>
                <div
                  className="group flex cursor-pointer items-center space-x-0.5
                  rounded p-1 text-lg text-muted-foreground transition-colors
                  duration-200"
                  onClick={handleDislike}
                >
                  <AiFillDislike
                    className={clsx(
                      {
                        "text-blue-500": disliked,
                      },
                      "group-hover:text-primary",
                    )}
                  />
                  {updating ? (
                    <Spinner></Spinner>
                  ) : (
                    <p className="text-xs">{currentProblem.dislikes}</p>
                  )}
                </div>

                <ButtonWithTooltip
                  className="group flex cursor-pointer items-center space-x-0.5
                  rounded p-1 text-lg text-muted-foreground transition-colors
                  duration-200"
                  tooltip={{
                    text: "Add to favorite list",
                  }}
                  onClick={handleFavorite}
                >
                  {updating ? (
                    <Spinner></Spinner>
                  ) : (
                    <AiFillStar
                      className={clsx(
                        {
                          "text-yellow-500": starred,
                        },
                        "group-hover:text-primary",
                      )}
                    />
                  )}
                </ButtonWithTooltip>
              </div>
            ) : (
              <ProblemDescriptionTabSkeleton
                solved={solved || allPassed}
              ></ProblemDescriptionTabSkeleton>
            )}

            {/* problem statement */}
            <div className="problem-statement text-sm ">
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
              <p className="text-sm font-medium">Constraints:</p>
              <ul className="ml-5 list-disc">
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
  const theme = useAppSelector(selectTheme);

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
          cn({
            "text-teal-300 bg-teal-500": difficulty === "easy",
            "text-teal-500 bg-teal-500":
              difficulty === "easy" && theme === "light",
            "text-yellow-500 bg-yellow-500": difficulty === "medium",
            "text-red-500 bg-red-500": difficulty === "hard",
          }),
        );
        setLoading(false);
      } else {
        // shouldn't reach here
        console.log("No such problem id");
      }
    };
    fetchProblem();
  }, [problemId, theme]);

  return { currentProblem, loading, difficultyClass, setCurrentProblem };
}

function useGetUserDataOnProblem(problemId: string) {
  const [user] = useAuthState(auth);
  const initialData = useMemo(
    () => ({
      liked: false,
      disliked: false,
      starred: false,
      solved: false,
    }),
    [],
  );
  const [userData, setUserData] = useState(initialData);

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

        setUserData({
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
    return () => setUserData(initialData);
  }, [problemId, user, initialData]);

  return { ...userData, setUserData };
  // return { ...initialData, setData };
}
