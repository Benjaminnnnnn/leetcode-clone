"use client";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import { selectTheme } from "@/redux/features/theme/themeSlice";
import { useAppSelector } from "@/redux/hooks";
import { LanguageType } from "@/utils/types/languages";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import startingCodeMap from "@/utils/playground/starting-code";

type Props = {
  params: {
    type: LanguageType;
  };
};

const Playground = ({ params: { type } }: Props) => {
  const setEditorTheme = useEditorTheme();
  const theme = useAppSelector(selectTheme);
  const [userCode, setUserCode] = useState(startingCodeMap[type]);
  const [consoleLog, setConsoleLog] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_RUNCODE_API || "";

  function handleCodeChange(value: string | undefined) {
    if (value) {
      setUserCode(value);
    }
  }

  async function runCode() {
    try {
      const result = await axios.post(apiUrl, {
        code: userCode,
        language: type,
      });
      setConsoleLog(result.data?.log || "");
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <div className="grow overflow-y-auto border md:mx-20 lg:mx-32 xl:mx-48">
      <div className="h-1/2">
        <Editor
          key={theme}
          language={type}
          value={userCode}
          options={{
            fontSize: 14,
            inlineSuggest: {
              enabled: true,
            },
            minimap: {
              enabled: true,
              side: "right",
              scale: 5,
              maxColumn: 100,
              size: "proportional",
            },
            formatOnPaste: true,
            formatOnType: true,
          }}
          onChange={handleCodeChange}
          onMount={setEditorTheme}
        />
      </div>
      <div className="flex h-1/2 w-full flex-col border-t">
        <div className="flex items-center justify-between border-b p-1">
          <div className="text-blue-500">Console output:</div>
          <button
            onClick={runCode}
            className="rounded-lg bg-blue-500 p-2 px-4 text-white"
          >
            Run
          </button>
        </div>
        <div className="h-full grow overflow-y-auto p-2">
          {consoleLog.split("\n").map((line, index) => (
            <section key={index}>{line}</section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
