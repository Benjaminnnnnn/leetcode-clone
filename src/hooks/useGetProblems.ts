import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetProblems = (
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>,
): DBProblem[] => {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const fetchProbelms = async () => {
      setLoadingProblems(true);
      // await sleep(10000);
      const problemsRef = collection(firestore, "problems");
      const q = query(problemsRef, orderBy("order"));
      const problemDocs = await getDocs(q);
      const data: DBProblem[] = [];
      problemDocs.forEach((problemDoc) => {
        data.push(problemDoc.data() as DBProblem);
      });
      setProblems(data);
      setLoadingProblems(false);
    };

    fetchProbelms();
  }, [setLoadingProblems]);
  return problems;
};
