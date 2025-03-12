"use client";
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
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { msgType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateFileAxiosData } from "@/lib/axiosData";
import { faPaw, faPerson } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import MultiIcon from "../icons/MultiIcon";
import { Textarea } from "../ui/textarea";
import CustomDropzone from "./CustomDropzone";
import CustomPreview from "./CustomPreview";

const CustomUserCard = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { data: session, update } = useSession();
  const searchParams = useSearchParams();
  const pageType = searchParams?.get("type");
  const period = searchParams?.get("period");
  const phone = searchParams?.get("phone");
  const email = searchParams?.get("email");
  const petNm = searchParams?.get("petNm");
  const petType = searchParams?.get("petType");
  const memo = searchParams?.get("memo");

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [editImg, setEditImg] = useState<boolean>(false);
  const [fileNm, setFileNm] = useState<{
    name?: string;
    type?: string;
    preview?: string | null;
    loading?: boolean;
    file?: File | null;
  }>({
    name: "",
    type: "",
    preview: null,
    loading: true,
    file: null,
  });

  useEffect(() => {
    if (pageType === "edit") {
      setFileNm({
        preview: session?.user?.image,
        loading: false,
      });
    }

    update();
  }, []);

  useEffect(() => {
    if (session?.user?.image === undefined) {
      setEditImg(true);
    }
  }, [session]);

  const formSchema = z
    .object({
      username: z.any(),
      period: z.number(),
      petNm: z.string().trim().min(1, "반려동물 이름을 입력해주세요."),
      phone: z.string().trim().min(1, "전화번호를 입력해주세요."),
      email: z
        .string()
        .trim()
        .min(1, "이메일을 입력해주세요.")
        .email("올바른 이메일 형식이 아닙니다."),
      petType: z.string().trim().min(1, "반려동물 종류를 입력해주세요."),
      memo: z.string().optional(),
      file: z
        .instanceof(File, { message: "파일을 업로드해주세요." })
        .optional(),
    })
    .refine(
      (data) => {
        if (!editImg) {
          return true;
        }
        if (data.file) {
          return true;
        }
        return false;
      },
      {
        message: "파일을 업로드해주세요.",
        path: ["file"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: pageType === "edit" ? phone ?? "" : "",
      email: pageType === "edit" ? email ?? "" : "",
      period: pageType === "edit" ? Number(period) : 3,
      petNm: pageType === "edit" ? petNm ?? "" : "",
      petType: pageType === "edit" ? petType ?? "" : "",
      memo: pageType === "edit" && memo === undefined ? "" : memo ?? "",
      file: pageType === "edit" ? fileNm?.file ?? undefined : undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingBtn(true);

    try {
      const formData = new FormData();

      const obj = {
        userId: id,
        name: session?.user?.name ?? "",
        phone: values.phone,
        period: String(values?.period),
        petNm: values.petNm,
        petType: values.petType,
        email: values.email,
        memo: values.memo ?? "",
      };

      Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (fileNm.file) {
        formData.append("img", fileNm.file);
      }

      const { message, status } = await updateFileAxiosData(
        "/api/user",
        formData
      );

      if (status === 200) {
        router.push(`/my-page/${session?.userId ?? ""}`);
      }
      toast(msgType[message]);
      setLoadingBtn(false);
    } catch (err) {
      console.error(err);
    }
  };

  const petTypeArr = [
    { key: "강아지", value: "dog" },
    { key: "고양이", value: "cat" },
  ];

  const TitleNm = ({ nm }: { nm: string }) => (
    <div className="flex md:pl-[6%] pb-6">
      <MultiIcon icon={nm === "회원정보" ? faPerson : faPaw} />
      <h1 className="pl-2 ">{nm}</h1>
    </div>
  );

  //const onError = (errors: any) => console.log("폼 에러:", errors);

  return (
    <div className="m-auto w-[100%] pt-3 md:pt-0">
      <Card className="h-[86vh] md:h-[89vh]">
        <CardHeader className="text-center text-[1.1rem]">
          <div>개인정보 수정</div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
                //onError
              )}
              className="space-y-8"
            >
              <ScrollArea className="h-[63vh] md:h-[60vh]">
                <TitleNm nm="회원정보" />
                <div className="flex justify-evenly">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[45%] md:w-[40%]">
                        <FormLabel>* 이름</FormLabel>
                        <FormControl>
                          <Input
                            disabled={true}
                            readOnly={true}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[45%] md:w-[40%]">
                        <FormLabel>* 연락처</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="이용자의 연락처를 입력해주세요"
                            {...field}
                            value={field.value || ""}
                            className={
                              form.formState.errors.phone
                                ? "border-red-500"
                                : ""
                            }
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="pb-10 w-[45%] md:w-[40%]">
                        <FormLabel>* 이메일</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="예약자 성함을 입력해주세요"
                            {...field}
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
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
                      <FormItem className="pb-10 w-[45%] md:w-[40%]">
                        <FormLabel>* 반려동물 양육기간</FormLabel>
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
                <Separator className="w-[90%] m-auto my-[30px]" />
                <TitleNm nm="팻 정보" />

                <div className="petBox flex w-[100%] gap-[50px] flex-col-reverse md:flex-row">
                  {!editImg ? (
                    <>
                      <CustomPreview
                        fileNm={fileNm}
                        setEditImg={setEditImg}
                        editImg={editImg}
                      />
                    </>
                  ) : (
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem className="pb-10 w-[100%] md:w-[45%] ">
                          <FormLabel className="pl-[13%]">
                            <div className="pl-[13%]">
                              {" "}
                              * 반려동물 사진 업로드
                            </div>
                          </FormLabel>
                          <FormControl>
                            <CustomDropzone
                              fileNm={fileNm}
                              setFileNm={(file) => {
                                setFileNm(file);
                                field.onChange(file.file);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="pl-[13%]" />
                          {session?.user?.image !== undefined &&
                            !fileNm.file && (
                              <div
                                className="pl-[13%] text-[13px]"
                                onClick={() => setEditImg(!editImg)}
                              >
                                이미지 수정 취소
                              </div>
                            )}
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="infoBox w-[100%] md:w-[48%]">
                    <FormField
                      control={form.control}
                      name={"petNm"}
                      render={({ field }) => (
                        <FormItem className="pb-10 w-[100%]">
                          <FormLabel>* 이름</FormLabel>

                          <FormControl>
                            <Input
                              placeholder={"반려동물의 이름을 입력해주세요"}
                              {...field}
                              value={field.value || ""}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"petType"}
                      render={({ field }) => (
                        <FormItem className="pb-10 w-[100%]">
                          <FormLabel>* 반려동물 종류</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value || ""}
                              //defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {petTypeArr.map((i, idx) => (
                                <div key={idx}>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={i.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {i.key}
                                    </FormLabel>
                                  </FormItem>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"memo"}
                      render={({ field }) => (
                        <FormItem className="pb-10 w-[100%]">
                          <FormLabel>특이사항</FormLabel>

                          <FormControl>
                            <Textarea
                              placeholder={"반려동물의 특이사항을 작성해주세요"}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>
              <Button type="submit" className="w-[100%]" disabled={loadingBtn}>
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
