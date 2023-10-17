import Spinner from "@/components/Loader/Spinner";
import { auth, firestore } from "@/firebase/firebase";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import { updateTestCaseOutputs } from "@/redux/features/workspace/workspaceSlice";
import { problems } from "@/utils/problems";
import { toastConfig } from "@/utils/react-toastify/toast";
import { Problem } from "@/utils/types/problem";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import Editor from "@monaco-editor/react";
import * as acorn from "acorn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditorFooter from "./EditorFooter/EditorFooter";
import PreferenceNav from "./PreferenceNav/PreferenceNav";

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
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit your code", toastConfig);
      return;
    }

    try {
      const problem = problems[id as string];
      const parsedCode = acorn.parse(userCode, { ecmaVersion: "latest" });

      if (parsedCode.body) {
        const functionNode = parsedCode.body.find(
          (node) => node.type === "FunctionDeclaration",
        );

        if (functionNode) {
          const functionBody = userCode.slice(
            functionNode.start,
            functionNode.end,
          );

          const callback = new Function(`return ${functionBody}`)();
          const handlerFunction = problem.handlerFunction;
          if (handlerFunction instanceof Function) {
            const outputs = handlerFunction(callback);
            console.log("handler function returned outputs");
            if (outputs) {
              dispatch(updateTestCaseOutputs(outputs));
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
            throw new Error(
              `${id}: handlerFunction property is not a function: `,
            );
          }
        } else {
          throw new Error("User code is not a valid function!");
        }
      }
    } catch (error: any) {
      let errorMessage;
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal",
        )
      ) {
        errorMessage = "One or more test cases failed.";
      } else if (error.message.startsWith("Unterminated regular expression")) {
        errorMessage = error.message;
      } else if ((error.message.startsWith("Unexpected token"), toastConfig)) {
        errorMessage = error.message;
      } else {
        console.log(error.message);
        errorMessage = "Something went wrong! Please try again";
      }

      toast.error(errorMessage, {
        ...toastConfig,
        autoClose: 5000,
      });
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
