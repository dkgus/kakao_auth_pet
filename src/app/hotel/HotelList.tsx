"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CustomCard from "@/app/hotel/CustomCard";

import SearchBar from "@/components/providers/SearchBar";

import { getAxiosData } from "@/lib/axiosData";
import Spin from "@/components/ui/spin";

const HotelList = () => {
  const [hList, setHList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const hotelList = async () => {
      try {
        const data = await getAxiosData("/api/hotel");

        setHList(data.hotels);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setHList([]);
        setLoading(true);
      }
    };

    hotelList();
  }, []);

  return (
    <>
      <SearchBar />
      <ScrollArea className="h-[90%] w-[100%] rounded-md border p-4">
        {loading ? (
          <div className="relative h-[70vh]">
            <div className="text-[gray] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="pl-[50%] pb-[10px]">
                <Spin />
              </div>
              호텔 리스트를 조회중입니다. 잠시만 기다려주세요...
            </div>
          </div>
        ) : (
          <>
            {" "}
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
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default HotelList;
