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

const DetailCard = () => {
  const { id } = useParams() as { id: string };
  const [hotelData, setHotelData] = useState<{
    ldgs_nm: string;
    imageUrl: string;
  }>({ ldgs_nm: "", imageUrl: "" });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await getAxiosData(`/api/hotel/${id}`);
      setHotelData(data.hotel);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-[50%]">
      <Card className="h-[88vh]">
        <CardHeader>
          <img src={hotelData.imageUrl} />
        </CardHeader>
        <CardContent>
          <CardTitle>{hotelData.ldgs_nm}</CardTitle>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default DetailCard;
