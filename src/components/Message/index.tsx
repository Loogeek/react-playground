import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

export interface MessageProps {
  type: "error" | "warn";
  content: string;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(!!content);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div className={clsx(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
};

export default Message;
