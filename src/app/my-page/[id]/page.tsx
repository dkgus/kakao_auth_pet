import WelcomeTitle from "@/components/providers/WelcomeTitle";
import { layoutCSS } from "@/lib/constants";
import React from "react";

const myPage = () => {
  return (
    <div className={layoutCSS + " " + "px-3"}>
      <div className="m-auto w-[95%]">
        <WelcomeTitle />
      </div>
    </div>
  );
};

export default myPage;
