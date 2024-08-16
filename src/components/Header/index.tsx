import React, { useContext } from "react";
import copy from "copy-to-clipboard";
import { message } from "antd";
import {
  MoonOutlined,
  SunOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { PlaygroundContext } from "@/PlaygroundContext";

import logoSvg from "@/assets/react.svg";
import styles from "./index.module.scss";
import { downloadFiles } from "@/utils";

const Header: React.FC = () => {
  const { theme, setTheme, files } = useContext(PlaygroundContext);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => {
              setTheme("dark");
            }}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => {
              setTheme("light");
            }}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制。");
          }}
        />
        <DownloadOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
