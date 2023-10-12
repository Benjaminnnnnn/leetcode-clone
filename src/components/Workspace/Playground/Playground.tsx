import Spinner from "@/components/Loader/Spinner";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import { Problem } from "@/utils/types/problem";
import Editor from "@monaco-editor/react";
import { ChangeEvent, useEffect, useState } from "react";
import EditorFooter from "./EditorFooter/EditorFooter";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import { toast } from "react-toastify";
import { toastConfig } from "@/utils/react-toastify/toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useParams, usePathname } from "next/navigation";
import { problems } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { DBUser } from "@/utils/types/users";

type Props = {
  problem: Problem;
};

interface ISettings {
  fontSize: number;
  settingModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground = ({ problem }: Props) => {
  const setTheme = useEditorTheme("dark");
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [settings, setSettings] = useState<ISettings>({
    fontSize: 16,
    settingModalIsOpen: false,
    dropdownIsOpen: false,
  });
  const [user] = useAuthState(auth);
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit your code", toastConfig);
      return;
    }

    try {
      const callback = new Function(userCode);
      // const callback = new Function(`return ${userCode}`)();
      const handlerFunction = problems[id as string].handlerFunction;
      if (handlerFunction instanceof Function) {
        console.log(callback);
        const passed = handlerFunction(callback);
        if (passed) {
          toast.success("All test cases have passed!", {
            ...toastConfig,
            autoClose: 5000,
          });

          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(id),
          });
        }
      } else {
        throw new Error(`${id}: handlerFunction property is not a function: `);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    // console.log(value);
    if (value) {
      setUserCode(value);
      localStorage.setItem(`code-${id}`, JSON.stringify(value));
    }
  };

  // load previous user code
  useEffect(() => {
    const code = localStorage.getItem(`code-${id}`);
    if (code && user) {
      setUserCode(JSON.parse(code));
    } else {
      setUserCode(problem.starterCode);
    }
  }, [id, user, problem.starterCode]);
  return (
    <div className="overflow-y-auto">
      <PreferenceNav></PreferenceNav>
      <Editor
        loading={<Spinner width="w-16"></Spinner>}
        language="javascript"
        value={userCode}
        options={{
          fontSize: settings.fontSize,
          inlineSuggest: {
            enabled: true,
          },
          minimap: {
            side: "right",
            scale: 5,
            maxColumn: 100,
            size: "fill",
          },
          formatOnPaste: true,
          formatOnType: true,
        }}
        onChange={handleCodeChange}
        onMount={setTheme}
      />
      <EditorFooter handleSubmit={handleSubmit}></EditorFooter>
    </div>
  );
};

export default Playground;
