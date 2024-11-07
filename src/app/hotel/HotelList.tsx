"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CustomCard from "@/app/hotel/CustomCard";
import SearchBar from "@/components/providers/SearchBar";
import { getAxiosData } from "@/lib/axiosData";

const HotelList = () => {
  const [hList, setHList] = useState<string[]>([]);

  useEffect(() => {
    const hotelList = async () => {
      try {
        const data = await getAxiosData("/api/hotel");
        setHList(data.hotels);
      } catch (err) {
        console.error(err);
        setHList([]);
      }
    };

    hotelList();
  }, []);

  return (
    <>
      <SearchBar />
      <ScrollArea className="h-[90%] w-[100%] rounded-md border p-4">
        <div className="flex flex-wrap flex-row gap-5">
          {/* 모바일 버전에서는 2개, 그 이상부턴 6개씩 */}
          {hList?.map((item, idx) => (
            <div
              key={idx}
              className="w-full sm:w-full md:w-[100%] lg:w-[100%] xl:w-[32%]"
            >
              <CustomCard item={Object(item)} />
            </div>
          ))}
        </div>

        <div>
          <Button className="w-[100%] mt-5">MORE</Button>
        </div>
      </ScrollArea>
    </>
  );
};

export default HotelList;
