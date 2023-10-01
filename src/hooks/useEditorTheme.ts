export const useEditorTheme = (theme: "light" | "dark") => {
  let base: string, colors: Object;
  if (theme === "light") {
    base = "vs";
    colors = {};
  } else {
    (base = "vs-dark"),
      (colors = {
        "editor.background": "#404040",
        "editor.lineHighlightBackground": "#525252",
        "editor.lineHighlightBorder": "#525252",
      });
  }

  const handleEditorDidMount = (_: any, monaco: any) => {
    monaco?.editor.defineTheme(theme, {
      base,
      inherit: true,
      rules: [],
      colors,
    });

    monaco?.editor.setTheme(theme);
  };

  return handleEditorDidMount;
};
