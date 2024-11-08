import React from "react";
import { layoutCSS } from "@/lib/constants";
import DetailCard from "../DetailCard";
import ReservationCard from "../ReservationCard";

const page = () => {
  return (
    <div className={layoutCSS + " " + "px-3"}>
      <div className="flex justify-between gap-[2%]">
        <DetailCard />
        <ReservationCard />
      </div>
    </div>
  );
};

export default page;
