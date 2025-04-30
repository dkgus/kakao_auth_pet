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
  const option = item.pet_info_cn;
  const featItems = JSON.parse(option.replace(/'/g, '"'));

  return (
    <Card className="h-[280px] md:h-[260px]">
      <CardHeader className="p-0 m-0">
        <Image
          priority
          src={item.imageUrl}
          alt="@hotelImg"
          width={400}
          height={120}
          className="rounded-t-lg w-full"
          sizes="(max-width: 768px) 100vw, 400px"
          style={{ objectFit: "cover", height: "120px" }}
        />
      </CardHeader>
      <CardContent className="py-1 m-0">
        <CardTitle className="pt-1 text-[14px] md:text-[17px]">
          {item.ldgs_nm}
        </CardTitle>
        <div className="text-[10px] md:text-[13px] text-gray-700">
          위치: {item.ldgs_addr}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-[100%]">
          <div className="min-h-[48px] max-h-[48px] md:min-h-[35px] md:max-h-[35px] ">
            {/* 태그 뱃지 */}
            {featItems.slice(0, 3).map((item: string, idx: number) => (
              <span key={idx}>
                <Badge className={`${mainBgColor} mr-[2px]`}>
                  <span className="text-[9px] md:text-[8px]">{item}</span>
                </Badge>
              </span>
            ))}

            {/* 더보기 뱃지 */}
            {featItems.length > 3 && (
              <span className="pl-1">
                <Badge
                  className={`${mainBgColor} text-[8px] md:text-[10px] text-white hover:text-gray-200`}
                >
                  + {featItems.length - 3}
                </Badge>
              </span>
            )}
          </div>
          <div
            onClick={() => router.push(`/hotel/${item._id}?type=create`)}
            className="hover:underline text-sm text-[#000] font-extrabold pt-7 md:pt-5 text-[12px] text-right"
          >
            예약하기
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
