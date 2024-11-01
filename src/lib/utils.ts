import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MapFuncType } from "./mapType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const weatherTitle: { [key: number]: string } = {
  200: "천둥",
  300: "보슬비",
  500: "비",
  600: "눈",

  701: "안개",
  711: "안개",
  721: "흐릿한",
  731: "먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "재",
  771: "돌풍",
  781: "토네이도",
  800: "맑음",

  801: "흐림",
  802: "흐림",
  803: "흐림",
  804: "흐림",
};

export const moveLocation = (
  ref: MapFuncType | null,
  la: number,
  lo: number
) => {
  return ref?.panTo(new kakao.maps.LatLng(Number(la), Number(lo)));
};
