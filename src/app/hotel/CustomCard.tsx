"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mainBgColor } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CustomCard = (props: {
  item: {
    _id: string;
    ldgs_nm: string;
    ldgs_addr: string;
    pet_info_cn: string;
    imageUrl: string;
  };
}) => {
  const { item } = props;
  const router = useRouter();

  const featItems = item.pet_info_cn
    .replace(/[\[\]']/g, "")
    .split(",")
    .map((item) => item.trim());
  return (
    <Card className="h-[260px]">
      <CardHeader className="p-0 m-0">
        <Image
          priority
          src={item.imageUrl}
          alt="@hotelImg"
          width={800}
          height={120}
          className="rounded-t-lg"
          style={{ objectFit: "cover", maxHeight: "120px" }}
        />
      </CardHeader>
      <CardContent className="py-1 m-0">
        <CardTitle className="pt-1 text-[14px] md:text-[17px]">
          {item.ldgs_nm}
        </CardTitle>
        <div className="text-[9.9px] md:text-[13px] text-[gray]">
          위치: {item.ldgs_addr}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-[100%]">
          <div
            className="min-h-[48px] max-h-[48px] md:min-h-[35px] md:max-h-[35px]"
            //style={{ minHeight: "35px", maxHeight: "35px" }}
          >
            {featItems.slice(0, 3).map((item, idx) => (
              <span key={idx}>
                <Badge className={`${mainBgColor} mr-[2px]`}>{item}</Badge>
              </span>
            ))}
            {featItems.length > 3 && (
              <span className="pl-1">
                <Badge
                  className={`${mainBgColor} text-[8px] md:text-[10px] text-[#000] hover:text-[#fff]`}
                >
                  + {featItems.length - 3}
                </Badge>
              </span>
            )}
          </div>
          <div
            onClick={() => router.push(`/hotel/${item._id}?type=create`)}
            className="hover:underline text-sm text-[#000] font-extrabold pt-1 md:pt-3 text-[12px] text-right"
          >
            예약하기
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
