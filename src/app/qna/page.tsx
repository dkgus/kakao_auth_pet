import React from "react";
import { layoutCSS } from "@/lib/constants";
import QnAList from "./QnAList";

const page = () => {
  return (
    <div className={layoutCSS + " " + "px-3"}>
      <QnAList />
    </div>
  );
};

export default page;
