"use client";

import React, { useEffect, useState } from "react";

import MultiTable from "../my-page/MultiTable";
import MultiCard from "../my-page/MultiCard";
import { deleteAxiosData, getAxiosData } from "@/lib/axiosData";
import { DataType } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { msgType } from "@/lib/utils";

export type tableType = {
  revId: string;
  revName: string;
  revCom: string;
  revDate: string;
  hotelId: string;
  revPeriod: string;
  visitMethod: "car" | "walking";
};

function ReservationInfo() {
  const [dataState, setData] = useState<tableType[]>([]);
  const { id } = useParams() as { id: string };

  const getData = async () => {
    const data = await getAxiosData(`/api/myPage/${id}`);

    const newArr = data?.data?.hotelList?.map((i: DataType) => {
      return {
        revId: i.reserveId,
        revName: i.revName,
        revCom: i.hotelInfo.ldgs_nm,
        visitMethod: i.visitMethod,
        revPeriod: `${i.startDate} ~ ${i.endDate}`,
        revDate: i.revDate,
        hotelId: i.hotelId,
      };
    });

    setData(newArr);
  };

  const deleteFunc = async (reserveId: string) => {
    const key = { userId: id, reserveId };
    const result = await deleteAxiosData(`/api/myPage/${key.reserveId}`, key);
    try {
      if (result.code === 200) {
        toast(msgType[result.message]);
        getData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="desktop-table hidden md:block">
        <MultiTable dataState={dataState} deleteFunc={deleteFunc} />
      </div>

      <div className="mobile-card block md:hidden">
        <MultiCard dataState={dataState} deleteFunc={deleteFunc} />
      </div>
    </div>
  );
}

export default ReservationInfo;
