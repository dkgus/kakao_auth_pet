"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

import { addDays, format } from "date-fns";

import { Input } from "@/components/ui/input";

import { cn, msgType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import MultiIcon from "../icons/MultiIcon";
import { faPerson, faPaw } from "@fortawesome/free-solid-svg-icons";

const CustomUserCard = () => {
  const router = useRouter();

  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const revType = searchParams?.get("type");
  const revNm = searchParams?.get("revNm");
  const revVisitMethod = searchParams?.get("visitMethod");
  const revStart = searchParams?.get("startDate");
  const revEnd = searchParams?.get("endDate");
  const revId = searchParams?.get("revId");

  const { data: session } = useSession();
  const [checked, setChecked] = useState<boolean>(
    revType !== "edit" ? false : revNm === session?.user?.name
  );

  const formSchema = z.object({
    username: z.string().optional(),
    revName: z
      .string()
      .trim()
      .refine((value) => checked || value.length >= 2, {
        message: "2 글자 이상 입력해주세요",
      }),
    date: z.object({
      from: z.date(),
      to: z.date(),
    }),
    visitMethod: z.string().optional(),
    period: z.number().optional(),
    petNm: z.string().trim(),
    petType: z.string().trim(),
    memo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: session?.user?.name ?? "",
      period: 3,
      revName: revType !== "edit" ? "" : revNm ?? "",
      visitMethod: revType !== "edit" ? "NCAR" : revVisitMethod ?? "",
      date: {
        from:
          revType !== "edit" ? new Date() : new Date(revStart ?? new Date()),

        to:
          revType !== "edit"
            ? addDays(new Date(), 2)
            : new Date(revEnd ?? new Date()),
      },
    },
  });

  const handleResponse = (status: number, message: string) => {
    try {
      if (status === 200) toast(msgType[message]);
      router.push(`/my-page/${session?.userId ?? ""}`);
    } catch (err) {
      console.log(err);
      if (status !== 200) toast(msgType[message]);
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const obj = {
      username: session?.user?.name,
      revName: checked ? session?.user?.name : values.revName,
      startDate: format(values.date.from, "yyyy-MM-dd"),
      endDate: format(values.date.to, "yyyy-MM-dd"),
      revDate: format(new Date(), "yyyy-MM-dd"),
      visitMethod: values.visitMethod,
      userId: session?.userId,
      hotelId: id,
    };

    // if (revType !== "edit") {
    //   const { status, message } = await postAxiosData("/api/hotel", obj);
    //   handleResponse(status, message);
    // } else {
    //   const revIdObj = { ...obj, reserveId: revId };
    //   const { status, message } = await updateAxiosData(
    //     `/api/hotel/${id}`,
    //     revIdObj
    //   );
    //   handleResponse(status, message);
    // }
  };

  const TitleNm = ({ nm }: { nm: string }) => (
    <div className="flex pl-[6%] pb-6">
      <MultiIcon icon={nm === "회원정보" ? faPerson : faPaw} />
      <h1 className="pl-2">{nm}</h1>
    </div>
  );

  return (
    <div className="m-auto w-[100%] pt-3 md:pt-0">
      <Card className="h-[45vh] md:h-[89vh]">
        <CardHeader className="text-center text-[1.1rem]">
          <div>개인정보 수정</div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ScrollArea className="h-[19vh] md:h-[60vh]">
                <TitleNm nm="회원정보" />
                <div className="flex justify-evenly">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[40%]">
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="예약자 성함을 입력해주세요"
                            {...field}
                            value={session?.user?.name ?? ""}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="revName"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[40%]">
                        <FormLabel>연락처</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="이용자의 성함을 입력해주세요"
                            {...field}
                            value={
                              checked ? session?.user?.name ?? "" : field.value
                            }
                            onChange={(e) => {
                              if (!checked) field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-evenly">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[40%]">
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="예약자 성함을 입력해주세요"
                            {...field}
                            value={session?.user?.name ?? ""}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[40%]">
                        <FormLabel>반려동물 양육기간</FormLabel>
                        <FormControl>
                          <Slider
                            max={15}
                            step={1}
                            value={[Number(field.value)]}
                            onValueChange={(value) => {
                              field.onChange(value[0]);
                            }}
                          />
                        </FormControl>
                        <span className="mt-2 block text-sm text-gray-700">
                          양육 기간: {field.value}년
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="w-[90%] m-auto my-[30px] " />
                <TitleNm nm="팻 정보" />

                <div className="flex w-[100%]">
                  <div className="imgBox w-[50%] pl-[6%]">
                    <img src="https://placehold.co/400x400" />
                  </div>
                  <div className="infoBox w-[48%]">
                    {Array(3)
                      .fill({ length: 4 })
                      .map((_, idx) => (
                        <FormField
                          control={form.control}
                          name={
                            idx === 0 ? "petNm" : idx === 1 ? "petType" : "memo"
                          }
                          render={({ field }) => (
                            <FormItem className="pb-10 w-[100%]">
                              <FormLabel>
                                {idx === 0
                                  ? "이름"
                                  : idx === 1
                                  ? "반려동물 종류"
                                  : "특이사항"}
                              </FormLabel>

                              <FormControl>
                                <Input
                                  placeholder="이용자의 성함을 입력해주세요"
                                  {...field}
                                  value={
                                    checked
                                      ? session?.user?.name ?? ""
                                      : field.value
                                  }
                                  onChange={(e) => {
                                    if (!checked) field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                  </div>
                </div>
              </ScrollArea>
              <Button type="submit" className="w-[100%] ">
                수정하기
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomUserCard;
