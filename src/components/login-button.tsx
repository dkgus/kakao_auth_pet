"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LoginButton = () => {
  const { data } = useSession();

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (data) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm text-white">
      {data?.user && (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <a href="#" onClick={onClick} className="text-sm text-white">
        {data ? "로그아웃" : "로그인"}
      </a>
    </div>
  );
};

export default LoginButton;
