"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { getAxiosData } from "@/lib/axiosData";
//import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { mainBgColor } from "@/lib/constants";

const DetailCard = () => {
  const { id } = useParams() as { id: string };
  const [feat, setFeat] = useState<string[]>([]);
  const [hotelData, setHotelData] = useState<{
    ldgs_nm: string;
    imageUrl: string;
    pet_info_cn: string;
  }>({ ldgs_nm: "", imageUrl: "", pet_info_cn: "" });
  console.log("hotelData", hotelData);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = hotelData.pet_info_cn;
    if (!data) return;
    const options = data
      .split("")
      .filter((v, idx) => idx !== 0 && idx !== data.length - 1 && v !== "'")
      .join("")
      .split(",");
    setFeat(options);
  }, [hotelData]);

  const getData = async () => {
    try {
      const data = await getAxiosData(`/api/hotel/${id}`);
      setHotelData(data.hotel);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="m-auto w-[95%] md:w-[50%]">
      <Card className="h-[35vh] md:h-[85vh]">
        <CardHeader>
          <img src={hotelData.imageUrl} className="h-[80px] md:h-[50%]" />

          {/* <Image
            priority
            src={hotelData.imageUrl || "/path/to/default-image.jpg"}
            alt="hotelImg"
            className="h-[120px] md:h-[50%]"
            width={800}
            height={120}
          /> */}
        </CardHeader>
        <CardContent>
          <CardTitle className="text-[17px]">{hotelData.ldgs_nm}</CardTitle>
          <div className="text-sm">
            <p className="pt-2">
              {hotelData.ldgs_nm} 호텔은 주변의 다양한 관광지와 근접하여
              대중교통만 이용하는 경우에 편리합니다.
            </p>
            <p className="pt-2">
              합리적인 가격으로 다양한 시설물을 이용해보세요!
            </p>
            <p className="pt-2">
              우리 호텔이 제공하는 서비스는 아래와 같습니다.
            </p>
            {feat.map((i, idx) => (
              <span key={idx}>
                <Badge className={`${mainBgColor} mr-1 mt-3`}>{i}</Badge>
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default DetailCard;
