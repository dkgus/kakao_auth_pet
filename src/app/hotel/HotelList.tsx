"use client";

import React, { useEffect, useState } from "react";
import { getAxiosData } from "@/lib/axiosData";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import Spin from "@/components/ui/spin";
import CustomCard from "@/app/hotel/CustomCard";
import SearchBar from "@/components/providers/SearchBar";

const HotelList = () => {
  const [hList, setHList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [word, setWord] = useState<string>("");
  const [enter, setOnEnter] = useState<string>("");

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const queryString = enter ? `&name=${enter}` : "";
      const data = await getAxiosData(`/api/hotel?page=${page}${queryString}`);
      if (page === 1) {
        setHList(data.hotels);
      } else {
        setHList((prevHotels) => [...prevHotels, ...data.hotels]);
      }
    } catch (err) {
      console.error("호텔 데이터 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, enter]);

  useEffect(() => {
    setPage(1);
  }, [enter]);

  return (
    <>
      <SearchBar
        value={word}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWord(e.target.value)
        }
        setEnter={setOnEnter}
      />
      <ScrollArea className="h-[91%] w-[100%] rounded-md border p-4">
        {loading && page === 1 ? (
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
              {hList.length >= 6 ? (
                <Button
                  className="w-[100%] mt-5"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  {loading ? <Spin /> : "MORE"}
                </Button>
              ) : null}
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default HotelList;
