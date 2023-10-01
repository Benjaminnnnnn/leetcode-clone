import Spinner from "@/components/Loader/Spinner";
import { useEditorTheme } from "@/hooks/useEditorTheme";
import Editor from "@monaco-editor/react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";

type Props = {};

interface ISettings {
  fontSize: string;
  settingModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}
const Playground = (props: Props) => {
  const setTheme = useEditorTheme("dark");

  return (
    <div className="overflow-y-auto">
      <PreferenceNav></PreferenceNav>
      <Editor
        loading={<Spinner width="w-16"></Spinner>}
        language="javascript"
        defaultValue="// Write your solution here"
        options={{
          fontSize: 16,
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
    </div>
  );
};

export default Playground;
