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
    <div className="h-[calc(100vh-64px)] border md:mx-20 lg:mx-32 xl:mx-48">
      <Editor
        key={theme}
        language={type}
        value={userCode}
        height="50%"
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
      <div className="h-1/2 w-full border-t">
        <div className="flex items-center justify-between border-b p-1">
          <div>Console output:</div>
          <button onClick={runCode} className="rounded-lg bg-blue-500 p-2 px-4">
            Run
          </button>
        </div>
        <div className="p-2">
          <p>
            {consoleLog.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Playground;
