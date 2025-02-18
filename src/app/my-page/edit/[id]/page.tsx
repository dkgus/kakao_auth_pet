import React from "react";
import { layoutCSS } from "@/lib/constants";
import CustomUserCard from "@/components/providers/CustomUserCard";

const page = () => {
  return (
    <div className={layoutCSS + " " + "px-3"}>
      <div className="m-auto w-[95%]">
        <CustomUserCard />
      </div>
    </div>
  );
};

export default page;
