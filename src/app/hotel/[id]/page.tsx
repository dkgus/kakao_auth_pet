"use client";

import React from "react";
import { layoutCSS } from "@/lib/constants";
import DetailCard from "../DetailCard";
import ReservationCard from "../ReservationCard";
import MultiIcon from "@/components/icons/MultiIcon";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className={layoutCSS + " " + "px-3"}>
      <div className="flex pb-3 ml-1">
        <MultiIcon icon={faChevronLeft} onClick={() => router.push("/hotel")} />
        <div className="pl-2 font-[500]" onClick={() => router.push("/hotel")}>
          목록으로 이동
        </div>
      </div>
      <div className="flex justify-between gap-[2%]">
        <DetailCard />
        <ReservationCard />
      </div>
    </div>
  );
};

export default Page;
