import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { compress, fileName2Language, uncompress } from "./utils";
import { initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export type Theme = "light" | "dark";

export interface PlaygroundContextProps {
  files: Files;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextProps>({
  selectedFileName: "App.tsx",
} as PlaygroundContextProps);

function getFilesFromUrl() {
  let files: Files | undefined;
  try {
    const json = uncompress(window.location.hash.slice(1));
    files = JSON.parse(json);
  } catch (error) {
    console.error(error);
  }

  return files;
}

const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const hash = JSON.stringify(files);
    window.location.hash = compress(hash);
  }, [files]);

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: "",
    };

    setFiles({
      ...files,
    });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({
      ...files,
    });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (!newFileName || !files[oldFileName]) return;
    const { [oldFileName]: value, ...restFiles } = files;

    setFiles({
      ...restFiles,
      [newFileName]: value,
    });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        theme,
        setTheme,
        setFiles,
        addFile,
        removeFile,
        selectedFileName,
        setSelectedFileName,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
