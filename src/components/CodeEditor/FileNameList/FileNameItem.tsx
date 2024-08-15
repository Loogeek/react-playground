import React from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

interface FileNameItemProps {
  actived: boolean;
  name: string;
  onClick: (name: string) => void;
}

const FileNameItem: React.FC<FileNameItemProps> = ({
  name,
  actived,
  onClick,
}) => {
  return (
    <div
      className={clsx(styles["tab-item"], actived ? styles.actived : null)}
      onClick={() => onClick(name)}
    >
      <span>{name}</span>
    </div>
  );
};

export default FileNameItem;
