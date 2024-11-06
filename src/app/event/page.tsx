"use client";

import { layoutCSS, loginURL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EventPage = () => {
  const { data: session, status } = useSession();
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

  return (
    <div className={layoutCSS}>
      {session ? (
        <p>예약사이트 입니다, {session.user?.name}님!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default EventPage;
