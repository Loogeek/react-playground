import { PlaygroundContext } from "@/PlaygroundContext";
import { useContext, useEffect, useMemo, useState } from "react";
import FileNameItem from "./FileNameItem";

import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName,
    updateFileName,
  } = useContext(PlaygroundContext);
  // const [tabsName, setTabsName] = useState([])

  const tabsName = useMemo(() => Object.keys(files), [files]);
  console.log("🚀 ~ FileNameList ~ tabsName:", tabsName);

  return (
    <div className={styles.tabs}>
      {tabsName.map((name, index) => (
        <FileNameItem
          name={name}
          key={index}
          actived={selectedFileName === name}
          onClick={setSelectedFileName}
        />
      ))}
    </div>
  );
}
