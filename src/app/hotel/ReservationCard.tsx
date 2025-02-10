"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, msgType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { postAxiosData } from "@/lib/axiosData";
import { toast } from "sonner";

const ReservationCard = () => {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const revType = searchParams?.get("type");
  const revNm = searchParams?.get("revNm");
  const revVisitMethod = searchParams?.get("visitMethod");
  const revStart = searchParams?.get("startDate");
  const revEnd = searchParams?.get("endDate");

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: session?.user?.name ?? "",
      revName: revType !== "edit" ? "" : revNm ?? "",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
    const { status, message } = await postAxiosData("/api/hotel", obj);
    try {
      if (status) toast(msgType[message]);
    } catch (err) {
      console.log(err);
      if (status !== 200) toast(msgType[message]);
    }
  };

  return (
    <div className="m-auto w-[95%] md:w-[50%] pt-3 md:pt-0">
      <Card className="h-[45vh] md:h-[85vh]">
        <CardHeader className="text-center text-[1.1rem]">
          <div>예약</div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ScrollArea className="h-[19vh] md:h-[60vh]">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="pb-10">
                      <FormLabel>예약자 명</FormLabel>
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
                    <FormItem className="pb-10">
                      <FormLabel>이용자 명</FormLabel>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          id="terms1"
                          checked={checked}
                          onCheckedChange={(e: boolean) => setChecked(e)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1"
                          >
                            예약자 명과 동일해요.
                          </label>
                        </div>
                      </div>
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
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className={cn("grid gap-2")}>
                      <FormItem className="pb-10">
                        <FormLabel>이용 날짜</FormLabel>
                        <div className="items-top flex space-x-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                  "w-[300px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {field.value?.from ? (
                                  field.value.to ? (
                                    <>
                                      {format(field.value.from, "LLL dd, y")} -{" "}
                                      {format(field.value.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(field.value.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={field.value?.from}
                                selected={field.value}
                                onSelect={(range) => {
                                  if (range) {
                                    form.setValue("date", {
                                      from: range.from ?? new Date(),
                                      to: range.to ?? new Date(),
                                    });
                                  }
                                }}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visitMethod"
                  render={({ field }) => (
                    <FormItem className="pb-10">
                      <FormLabel>방문 수단 선택</FormLabel>
                      <div className="items-top flex space-x-2 flex-row">
                        <RadioGroup
                          defaultValue={
                            revType !== "edit" ? "NCAR" : revVisitMethod ?? ""
                          }
                          className="flex"
                          onChange={(e) => field.onChange(e)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="NCAR" id="NCAR" />
                            <Label htmlFor="NCAR">대중교통</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="CAR" id="CAR" />
                            <Label htmlFor="CAR">차</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </FormItem>
                  )}
                />
              </ScrollArea>
              <Button type="submit" className="w-[100%]">
                예약하기
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationCard;
