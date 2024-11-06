import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CustomCard from "@/app/hotel/CustomCard";
import SearchBar from "@/components/providers/SearchBar";

const HotelList = () => {
  return (
    <>
      <SearchBar />
      <ScrollArea className="h-[90%] w-[100%] rounded-md border p-4">
        <div className="flex flex-wrap flex-row gap-5">
          {/* 모바일 버전에서는 2개, 그 이상부턴 6개씩 */}
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full sm:w-full md:w-[100%] lg:w-[100%] xl:w-[32%]"
              >
                <CustomCard />
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
