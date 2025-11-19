import Spinner from "@/components/Loader/Spinner";
import PlaygroundSetting from "@/components/Modal/PlaygroundSetting";
import { auth, firestore } from "@/firebase/firebase";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { selectTheme } from "@/redux/features/theme/themeSlice";
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

const parseUserFunction = (userCode: string) => {
  const parsedCode: any = acorn.parse(userCode, { ecmaVersion: "latest" });
  if (!parsedCode.body) {
    throw new Error("User code is not a valid function!");
  }

  const functionNode = parsedCode.body.find(
    (node: any) => node.type === "FunctionDeclaration",
  );

  if (!functionNode) {
    throw new Error("User code is not a valid function!");
  }

  const functionBody = userCode.slice(functionNode.start, functionNode.end);
  const callback = new Function(`return ${functionBody}`)();

  if (typeof callback !== "function") {
    throw new Error("Parsed code is not executable.");
  }

  return callback;
};

const getSubmitErrorMessage = (error: any): string => {
  const message = (error as Error)?.message || "Unknown error";

  if (
    message.startsWith(
      "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal",
    )
  ) {
    return "One or more test cases failed.";
  }

  if (message.startsWith("Unterminated regular expression")) {
    return message;
  }

  if (message.startsWith("Unexpected token")) {
    return message;
  }

  return "Something went wrong! Please try again";
};

const ProblemCodeEditor = ({ problem }: Props) => {
  const setEditorTheme = useEditorTheme();
  const theme = useAppSelector(selectTheme);
  const settingModalIsOpen = useAppSelector(selectSettingModal);
  const [fontSize, setFontSize] = useLocalStorage("font-size", "16");
  const [formatOnType, setFormatOnType] = useLocalStorage(
    "format-on-type",
    "true",
  );
  const [showMinimap, setShowMinimap] = useLocalStorage("show-minimap", "true");
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit your code", toastConfig);
      return;
    }

    const problemId = id as string | undefined;
    const problemDefinition = problemId ? problems[problemId] : undefined;

    if (
      !problemDefinition ||
      typeof problemDefinition.handlerFunction !== "function"
    ) {
      toast.error("Unable to run tests for this problem.", toastConfig);
      return;
    }

    try {
      const userSolution = parseUserFunction(userCode);
      const outputs = problemDefinition.handlerFunction(userSolution);

      if (!isTestCaseResults(outputs)) {
        throw new Error("Problem handler did not return test results.");
      }

      dispatch(updateTestCaseResults(outputs));
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
    } catch (error: any) {
      dispatch(resetTestCaseResults());
      toast.error(getSubmitErrorMessage(error), {
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

  return (
    <div className="overflow-y-hidden">
      <PreferenceNav></PreferenceNav>
      <Editor
        key={theme}
        loading={
          <div className="flex items-center justify-center">
            <Spinner width="w-16"></Spinner>
          </div>
        }
        language="javascript"
        value={userCode}
        options={{
          fontSize: parseInt(fontSize),
          inlineSuggest: {
            enabled: true,
          },
          minimap: {
            enabled: showMinimap === "true" ? true : false,
            side: "right",
            scale: 5,
            maxColumn: 100,
            size: "fill",
          },
          formatOnPaste: true,
          formatOnType: formatOnType === "true" ? true : false,
        }}
        onChange={handleCodeChange}
        onMount={setEditorTheme}
      />
      <EditorFooter handleSubmit={handleSubmit}></EditorFooter>

      {settingModalIsOpen && (
        <PlaygroundSetting
          fontSize={fontSize}
          formatOnType={formatOnType}
          showMinimap={showMinimap}
          setFontSize={setFontSize}
          setFormatOnType={setFormatOnType}
          setShowMinimap={setShowMinimap}
        ></PlaygroundSetting>
      )}
    </div>
  );
};

export default ProblemCodeEditor;
