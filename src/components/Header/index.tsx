import React from "react";
import logoSvg from "@/assets/react.svg";

const Header: React.FC = () => {
  return (
    <header className="border-b border-black h-[50px] px-5 box-border flex items-center justify-between">
      <div className="flex items-center text-xl">
        <img alt="logo" src={logoSvg} className="h-6 mr-[10px]" />
        React Playground
      </div>
    </header>
  );
};

export default Header;
