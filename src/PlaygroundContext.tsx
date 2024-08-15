import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContextProps {
  files: Files;
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

const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState(initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");

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
