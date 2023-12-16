import { selectTheme } from "@/redux/features/theme/themeSlice";
import { Theme } from "@/redux/features/theme/themeThunks";
import { useAppSelector } from "@/redux/hooks";
import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useState } from "react";

const getEditorTheme = (theme: Theme): editor.IStandaloneThemeData => {
  if (theme === "light") {
    return {
      base: "vs",
      colors: {
        "editor.lineHighlightBackground": "#F8F8F8",
        "editor.lineHighlightBorder": "#F8F8F8",
      },
      inherit: true,
      rules: [],
    };
  } else {
    return {
      base: "vs-dark",
      colors: {
        "editor.background": "#020817",
        "editor.lineHighlightBackground": "#1f1f1f",
        "editor.lineHighlightBorder": "#1f1f1f",
      },
      inherit: true,
      rules: [],
    };
  }
};

export const useEditorTheme = () => {
  const theme = useAppSelector(selectTheme);
  const [monacoEditorTheme, setMonacoEditorTheme] =
    useState<editor.IStandaloneThemeData>(getEditorTheme(theme));

  useEffect(() => {
    setMonacoEditorTheme(getEditorTheme(theme === "light" ? "dark" : "light"));
  }, [theme]);

  const handleEditorDidMount = (
    _: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    monaco?.editor.defineTheme(theme, monacoEditorTheme);
    monaco?.editor.setTheme(theme);
  };

  return handleEditorDidMount;
};
