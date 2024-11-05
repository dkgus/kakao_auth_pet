"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LoginButton = () => {
  const { data } = useSession();
  const router = useRouter();

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (data) {
      await signOut();
    } else {
      await signIn();
    }
  };

  const onPageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const text = target.innerHTML;
    if (text === "이벤트") {
      router.push("/event");
    }
  };
  return (
    <div className="flex items-center gap-3">
      {
        data?.user && "로그인 완료"
        // <Avatar>
        //
        //   <AvatarImage src={data.user.image ?? ""} alt="user image" />
        //                   <AvatarFallback>CN</AvatarFallback>
        //
        // </Avatar>
      }

      {data && (
        <div onClick={onPageMove} className="text-sm text-white">
          이벤트
        </div>
      )}
      <a href="#" onClick={onClick} className="text-sm text-white">
        {data ? "로그아웃" : "카카오 아이디로 로그인"}
      </a>
    </div>
  );
};

export default LoginButton;
