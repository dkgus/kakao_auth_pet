"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ReservationCard = () => {
  const { data: session } = useSession();
  const [checked, setChecked] = useState<boolean>(false);

  const formSchema = z.object({
    username: z.string().optional(),
    username2: z
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
      username2: "",
      date: {
        from: new Date(),
        to: addDays(new Date(), 2),
      },
      visitMethod: "NCAR",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const obj = {
      username: session?.user?.name,
      username2: checked ? session?.user?.name : values.username2,
      date: format(values.date.from, "yyyy-MM-dd"),
      visitMethod: values.visitMethod,
    };
    console.log("obj", obj);
  }

  return (
    <div className="w-[50%]">
      <Card className="h-[85vh]">
        <CardHeader className="text-center text-[1.1rem]">
          <div>예약</div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
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
                name="username2"
                render={({ field }) => (
                  <FormItem>
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
                        onChange={(e) => field.onChange(e)}
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
                    <FormItem>
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                  <FormItem>
                    <FormLabel>방문 수단 선택</FormLabel>
                    <div className="items-top flex space-x-2 flex-row">
                      <RadioGroup
                        defaultValue="NCAR"
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
