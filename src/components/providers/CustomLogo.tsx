"use client";
import React from "react";
import MultiIcon from "@/components/icons/MultiIcon";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const CustomLogo = () => {
  const router = useRouter();

  return (
    <div className="font-bold flex" onClick={() => router.push("/")}>
      <MultiIcon icon={faPaw} />
      <div className="pl-2">OH MY PET</div>
    </div>
  );
};

export default CustomLogo;
