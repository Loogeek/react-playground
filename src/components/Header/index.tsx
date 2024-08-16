import React, { useContext } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { PlaygroundContext } from "@/PlaygroundContext";

import logoSvg from "@/assets/react.svg";
import styles from "./index.module.scss";

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(PlaygroundContext);
  console.log(1111, theme);
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
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
