"use client";

import React, { useEffect, useState } from "react";

import MultiTable from "../my-page/MultiTable";
import MultiCard from "../my-page/MultiCard";
import { deleteAxiosData, getAxiosData } from "@/lib/axiosData";
import { DataType } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { msgType } from "@/lib/utils";
import { TableType } from "@/lib/utils";
function ReservationInfo() {
  const [dataState, setData] = useState<TableType[]>([]);
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
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
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
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
    <div>
      <div className="desktop-table hidden lg:block">
        <MultiTable dataState={dataState} deleteFunc={deleteFunc} />
      </div>

      <div className="mobile-card lg:hidden">
        <MultiCard
          dataState={dataState}
          deleteFunc={deleteFunc}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ReservationInfo;
