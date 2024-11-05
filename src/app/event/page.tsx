"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { loginURL } from "@/lib/constants";

const EventPage = () => {
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      const a = confirm(
        "회원만 이용 가능한 페이지입니다. 로그인 하시겠습니까? 취소를 누르면 메인화면으로 이동합니다."
      );
      if (a) {
        router.push(loginURL);
      } else {
        router.push("/");
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>로그인 된 회원만 볼 수 있는 화면</>;
};

export default EventPage;
