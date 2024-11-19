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
  const [page, setPage] = useState<number>(1);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await getAxiosData(`/api/hotel?page=${page}`);

      if (page !== 1 && data.hotels) {
        setHList((prevHotels) => [...prevHotels, ...data.hotels]);
      } else if (page === 1 && data.hotels) {
        setHList(data.hotels);
      }
    } catch (err) {
      console.error("호텔 데이터 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  return (
    <>
      <SearchBar />
      <ScrollArea className="h-[91%] w-[100%] rounded-md border p-4">
        {loading ? (
          <div className="relative h-[70vh]">
            <div className="text-[gray] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="pl-[50%] pb-[10px]">
                <Spin />
              </div>
              리스트를 조회중입니다. <br />
              잠시만 기다려주세요...
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div className="flex flex-wrap flex-row gap-5">
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
              <Button
                className="w-[100%] mt-5"
                onClick={() => setPage((prev) => prev + 1)}
              >
                MORE
              </Button>
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default HotelList;
