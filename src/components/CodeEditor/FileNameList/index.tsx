import { PlaygroundContext } from "@/PlaygroundContext";
import { useContext, useEffect, useMemo, useState } from "react";
import FileNameItem from "./FileNameItem";

import styles from "./index.module.scss";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "@/files";

export default function FileNameList() {
  const {
    files,
    addFile,
    selectedFileName,
    setSelectedFileName,
    updateFileName,
    removeFile,
  } = useContext(PlaygroundContext);

  const tabsName = useMemo(() => Object.keys(files), [files]);
  const [creating, setCreating] = useState(false);

  const handleEditComplete = (oleName: string, newName: string) => {
    updateFileName(oleName, newName);
    setSelectedFileName(newName);
  };

  const handleAddTab = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemoveFile = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabsName.map((name, index, arr) => (
        <FileNameItem
          key={name + index}
          value={name}
          readonly={readonlyFileNames.includes(name)}
          actived={selectedFileName === name}
          creating={creating && index === arr.length - 1}
          onClick={() => setSelectedFileName(name)}
          onEditComplete={(newName) => handleEditComplete(name, newName)}
          onRemove={() => handleRemoveFile(name)}
        />
      ))}
      {
        <div className="cursor-pointer ml-1" onClick={handleAddTab}>
          +
        </div>
      }
    </div>
  );
}
