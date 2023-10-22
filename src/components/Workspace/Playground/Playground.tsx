import Spinner from "@/components/Loader/Spinner";
import PlaygroundSetting from "@/components/Modal/PlaygroundSetting";
import { auth, firestore } from "@/firebase/firebase";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import {
  resetTestCaseResults,
  selectSettingModal,
  updateTestCaseResults,
} from "@/redux/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { problems } from "@/utils/problems";
import { toastConfig } from "@/utils/react-toastify/toast";
import { Problem, isTestCaseResults } from "@/utils/types/problem";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import Editor from "@monaco-editor/react";
import * as acorn from "acorn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import EditorFooter from "./EditorFooter/EditorFooter";
import PreferenceNav from "./PreferenceNav/PreferenceNav";

type Props = {
  problem: Problem;
};

export interface ISettings {
  fontSize: string;
  [key: string]: string;
}

const Playground = ({ problem }: Props) => {
  const setTheme = useEditorTheme("dark");
  const settingModalIsOpen = useAppSelector(selectSettingModal);
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [settings, setSettings] = useState<ISettings>({
    fontSize: "16",
  });
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit your code", toastConfig);
      return;
    }

    try {
      const problem = problems[id as string];
      const parsedCode = acorn.parse(userCode, { ecmaVersion: "latest" });

      // parse user code
      if (parsedCode.body) {
        const functionNode = parsedCode.body.find(
          (node) => node.type === "FunctionDeclaration",
        );

        if (functionNode) {
          const functionBody = userCode.slice(
            functionNode.start,
            functionNode.end,
          );

          // convert user code to actual function and evaluate
          const callback = new Function(`return ${functionBody}`)();
          const handlerFunction = problem.handlerFunction;
          if (handlerFunction instanceof Function) {
            const outputs = handlerFunction(callback);
            if (isTestCaseResults(outputs)) {
              dispatch(updateTestCaseResults(outputs));
              console.log(outputs);
              if (outputs.allPassed) {
                toast.success("All test cases have passed!", {
                  ...toastConfig,
                  autoClose: 5000,
                });

                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                  solvedProblems: arrayUnion(id),
                });
              } else {
                toast.error("One or more test cases failed.", toastConfig);
              }
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
      dispatch(resetTestCaseResults());
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

  // preserve user workspace setting
  useEffect(() => {
    if (user) {
      const savedSettings = { ...settings };
      for (const preferenceName of Object.keys(settings)) {
        const preferenceValue = localStorage.getItem(preferenceName);
        if (preferenceValue) {
          savedSettings[preferenceName] = preferenceValue;
        }
      }
      setSettings(savedSettings);
    } else {
      for (const preferenceName of Object.keys(settings)) {
        localStorage.removeItem(preferenceName);
      }
    }
  }, [user]);

  return (
    <div className="overflow-y-hidden">
      <PreferenceNav></PreferenceNav>
      <Editor
        loading={<Spinner width="w-16"></Spinner>}
        language="javascript"
        value={userCode}
        options={{
          fontSize: parseInt(settings.fontSize),
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

      {settingModalIsOpen && (
        <PlaygroundSetting
          settings={settings}
          setSettings={setSettings}
        ></PlaygroundSetting>
      )}
    </div>
  );
};

export default Playground;
