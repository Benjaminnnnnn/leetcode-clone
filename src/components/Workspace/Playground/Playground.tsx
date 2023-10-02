import Spinner from "@/components/Loader/Spinner";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import { Problem } from "@/utils/types/problem";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import EditorFooter from "./EditorFooter/EditorFooter";
import PreferenceNav from "./PreferenceNav/PreferenceNav";

type Props = {
  problem: Problem;
};

interface ISettings {
  fontSize: string;
  settingModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground = ({ problem }: Props) => {
  const setTheme = useEditorTheme("dark");
  const [userCode, setUserCode] = useState(problem.starterCode);
  const [settings, setSettings] = useState<ISettings>({
    fontSize: "16px",
    settingModalIsOpen: false,
    dropdownIsOpen: false,
  });

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
          },
          formatOnPaste: true,
          formatOnType: true,
        }}
        onMount={setTheme}
      />
      <EditorFooter></EditorFooter>
    </div>
  );
};

export default Playground;
