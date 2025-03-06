import React from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableType } from "@/lib/utils";
import CustomTooltip from "@/components/providers/CustomTooltip";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Spin from "@/components/ui/spin";

const MultiCard = (props: {
  dataState: TableType[];
  loading: boolean;
  deleteFunc: (reserveId: string) => void;
}) => {
  const router = useRouter();

  const { dataState, deleteFunc, loading } = props;

  return (
    <div className="mobile-card block">
      <h2 className="py-3">예약 리스트</h2>
      {loading ? (
        <span className="grid justify-center">
          <Spin />
        </span>
      ) : (
        <ScrollArea className="h-[45vh]">
          {dataState.map((i) => (
            <Card key={i.revId} className="text-[13px] mb-[10px]">
              <CardHeader className="flex flex-row justify-between items-baseline">
                <div className="text-[15px] font-extrabold">{i.revCom}</div>
                <div>
                  <CustomTooltip
                    btnClass="mr-1 h-8 px-2 pb-1"
                    icon={faPenToSquare}
                    text="수정"
                    type="icnBtn"
                    onClick={() =>
                      router.push(
                        `/hotel/${i.hotelId}?type=edit&revNm=${
                          i.revName
                        }&startDate=${i.revPeriod.split(" ~ ")[0]}&endDate=${
                          i.revPeriod.split(" ~ ")[1]
                        }&visitMethod=${i.visitMethod}&revId=${i.revId}`
                      )
                    }
                  />

                  <CustomTooltip
                    icon={faTrash}
                    btnClass="mr-1 h-8 px-2 bg-[red] pb-1 hover:bg-[red]"
                    text="삭제"
                    type="icnBtn"
                    onClick={() => {
                      toast("정말 예약을 취소하시겠습니까?", {
                        description: "취소는 복구되지않습니다.",
                        action: {
                          label: "삭제",
                          onClick: () => deleteFunc(i.revId),
                        },
                        closeButton: true,
                      });
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div>✔️ 예약 번호: {i.revId}</div>
                <div>✔️ 예약자 이름: {i.revName}</div>
                <div>✔️ 예약 기간: {i.revPeriod}</div>
                <div>
                  ✔️ 방문 수단:{" "}
                  <Badge
                    variant={i.visitMethod === "CAR" ? "outline" : "default"}
                  >
                    <div className="font-medium">
                      {i.visitMethod === "CAR" ? "차량" : "도보"}
                    </div>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default MultiCard;
