import React, { useContext } from "react";
import { debounce } from "lodash-es";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "@/PlaygroundContext";

const CodeEditor: React.FC = () => {
  const { files, setFiles, selectedFileName, theme } =
    useContext(PlaygroundContext);

  function onEditorChange(value?: string) {
    files[selectedFileName].value = value!;

    setFiles({
      ...files,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor
        file={files[selectedFileName]}
        onChange={debounce(onEditorChange, 500)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
};

export default CodeEditor;
