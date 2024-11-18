import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBolt,
  faCloud,
  faCloudRain,
  faDroplet,
  faSmog,
  faSnowflake,
  faSun,
  faTornado,
} from "@fortawesome/free-solid-svg-icons";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MapFuncType } from "./mapType";
interface WeatherDetail {
  title: string;
  icon: IconDefinition;
}

type WeatherTitleMap = {
  [key: number]: WeatherDetail;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const weatherTitle: WeatherTitleMap = {
  200: { title: "천둥", icon: faBolt },
  201: { title: "천둥", icon: faBolt },
  202: { title: "천둥", icon: faBolt },
  210: { title: "천둥", icon: faBolt },
  211: { title: "천둥", icon: faBolt },
  212: { title: "천둥", icon: faBolt },
  221: { title: "천둥", icon: faBolt },
  230: { title: "천둥", icon: faBolt },
  231: { title: "천둥", icon: faBolt },
  232: { title: "천둥", icon: faBolt },

  300: { title: "보슬비", icon: faDroplet },
  301: { title: "보슬비", icon: faDroplet },
  302: { title: "보슬비", icon: faDroplet },
  310: { title: "보슬비", icon: faDroplet },
  311: { title: "보슬비", icon: faDroplet },
  312: { title: "보슬비", icon: faDroplet },
  313: { title: "보슬비", icon: faDroplet },
  314: { title: "보슬비", icon: faDroplet },
  321: { title: "보슬비", icon: faDroplet },

  500: { title: "비", icon: faCloudRain },
  501: { title: "비", icon: faCloudRain },
  502: { title: "비", icon: faCloudRain },
  503: { title: "비", icon: faCloudRain },
  504: { title: "비", icon: faCloudRain },
  511: { title: "비", icon: faCloudRain },
  520: { title: "비", icon: faCloudRain },
  521: { title: "비", icon: faCloudRain },
  522: { title: "비", icon: faCloudRain },
  531: { title: "비", icon: faCloudRain },

  600: { title: "눈", icon: faSnowflake },
  601: { title: "눈", icon: faSnowflake },
  602: { title: "눈", icon: faSnowflake },
  611: { title: "눈", icon: faSnowflake },
  612: { title: "눈", icon: faSnowflake },
  613: { title: "눈", icon: faSnowflake },
  615: { title: "눈", icon: faSnowflake },
  616: { title: "눈", icon: faSnowflake },
  620: { title: "눈", icon: faSnowflake },
  621: { title: "눈", icon: faSnowflake },
  622: { title: "눈", icon: faSnowflake },

  701: { title: "안개", icon: faSmog },
  711: { title: "안개", icon: faSmog },
  721: { title: "흐릿함", icon: faSmog },
  731: { title: "먼지", icon: faSmog },
  741: { title: "안개", icon: faSmog },
  751: { title: "모래", icon: faSmog },
  761: { title: "먼지", icon: faSmog },
  762: { title: "재", icon: faSmog },
  771: { title: "돌품", icon: faTornado },
  781: { title: "토네이도", icon: faTornado },

  800: { title: "맑음", icon: faSun },

  801: { title: "흐림(11-25%)", icon: faCloud },
  802: { title: "흐림(25-50%)", icon: faCloud },
  803: { title: "흐림(51-84%)", icon: faCloud },
  804: { title: "흐림(85-100%)", icon: faCloud },
};

export const moveLocation = (
  ref: MapFuncType | null,
  la: number,
  lo: number
) => {
  return ref?.panTo(new kakao.maps.LatLng(Number(la), Number(lo)));
};

export const msgType: { [key: string]: string } = {
  CREATE_HOTEL: "호텔 예약이 완료되었습니다.",
  CREATE_HOTEL_FAIL: "호텔 예약에 실패했습니다. 다시 시도해주세요. ",
  CREATE_HOTEL_FAIL_DEP: "동일한 호텔은 예약할 수 없습니다.",
};
