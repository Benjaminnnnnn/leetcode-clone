import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetProblems = (
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>,
): DBProblem[] => {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProblems = async () => {
      setLoadingProblems(true);
      try {
        const problemsRef = collection(firestore, "problems");
        const q = query(problemsRef, orderBy("order"));
        const problemDocs = await getDocs(q);
        const data: DBProblem[] = [];
        problemDocs.forEach((problemDoc) => {
          data.push(problemDoc.data() as DBProblem);
        });
        if (isMounted) {
          setProblems(data);
        }
      } catch (error) {
        console.error("Failed to fetch problems", error);
        if (isMounted) {
          setProblems([]);
        }
      } finally {
        if (isMounted) {
          setLoadingProblems(false);
        }
      }
    };

    fetchProblems();

    return () => {
      isMounted = false;
    };
  }, [setLoadingProblems]);
  return problems;
};
