"use client";

import CustomMenu from "@/components/providers/CustomMenu";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data } = useSession();

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn();
  };

  return (
    <div className="flex items-center  text-sm text-white">
      {data?.user && (
        <CustomMenu
          type="r_down"
          menuList={[
            { key: "myPage", value: "마이 페이지" },
            { key: "logout", value: "LOGOUT" },
          ]}
        />
      )}

      <a onClick={onClick} className="text-sm text-white">
        {!data && "로그인"}
      </a>
    </div>
  );
};

export default LoginButton;
