"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CustomCard from "@/app/hotel/CustomCard";

import SearchBar from "@/components/providers/SearchBar";

import { getAxiosData } from "@/lib/axiosData";
import { HotelImgType } from "@/lib/hotelType";

const HotelList = () => {
  const [hList, setHList] = useState<string[]>([]);
  const [imgLi, setImgLi] = useState<HotelImgType[]>([]);

  useEffect(() => {
    const imgList = async () => {
      try {
        const data = await getAxiosData(
          "https://picsum.photos/v2/list?page=2&limit=6"
        );
        setImgLi(data);
      } catch (err) {
        console.error(err);
      }
    };
    imgList();
  }, []);

  useEffect(() => {
    if (imgLi.length === 0) return;

    const hotelList = async () => {
      try {
        const data = await getAxiosData("/api/hotel");
        const imgDataSet = data?.hotels?.map(
          (item: HotelImgType, idx: number) => {
            const downloadUrl = imgLi[idx]?.download_url ?? null;

            return {
              ...item,
              img: downloadUrl,
            };
          }
        );

        setHList(imgDataSet);
      } catch (err) {
        console.error(err);
        setHList([]);
      }
    };

    hotelList();
  }, [imgLi]);

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
