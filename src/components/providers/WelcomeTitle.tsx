"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import MultiIcon from "@/components/icons/MultiIcon";

const WelcomeTitle = () => {
  const { data: session } = useSession();
  return (
    <div className="text-center">
      <Card className="bg-[#FAF7F0]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-left">회원 정보</CardTitle>

            <Button className={"mr-1 h-8 px-2 pb-1"} onClick={() => null}>
              <MultiIcon icon={faPenToSquare} />
            </Button>
          </div>

          <CardDescription className="text-left">
            {session?.user?.name}님 안녕하세요 :)
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left text-[13px]">
          <p>😊 반려동물 이름: 고양이 </p>
          <p>😊 반려동물 타입: 고양이</p>
          <p>😊 회원 이름: {session?.user?.name}</p>
          <p>😊 회원 이메일: email@naver.com</p>
          <p>😊 회원 연락처: 010.1234.5678</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeTitle;
