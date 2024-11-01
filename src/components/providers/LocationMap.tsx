"use client";

import React, { useEffect, useState } from "react";
import { getAxiosData } from "@/lib/axiosData";

import { Map } from "react-kakao-maps-sdk";
import { moveLocation, weatherTitle } from "@/lib/utils";
import { weatherURL } from "@/lib/constants";
import {
  LocationType,
  HotelType,
  MapFuncType,
  MarkerType,
} from "@/lib/mapType";

import { Button } from "@/components/ui/button";
import CustomMaker from "@/components/providers/CustomMaker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Spin from "../ui/spin";

const LocationMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const wApiKey: string | undefined = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const hospitalURL: string | undefined = process.env.NEXT_PUBLIC_HOSPITAL_URL;
  const hotelURL: string | undefined = process.env.NEXT_PUBLIC_HOTEL_URL;

  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [wInfo, setWInfo] = useState<number>(0);
  const [mapInstance, setMapInstance] = useState<MapFuncType | null>(null);
  const [location, setLocation] = useState<{
    center: { lat: number; lng: number };
    errMsg: string;
    isLoading: boolean;
  }>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: "",
    isLoading: true,
  });

  const [hospitalList, setHospitalList] = useState<LocationType[]>([]);
  const [hotelList, setHotelList] = useState<LocationType[]>([]);
  const [hotelTemp, setHotelTemp] = useState<HotelType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  useEffect(() => {
    if (location) {
      getWeather();
    }
  }, [location, wApiKey]);

  const getWeather = async () => {
    try {
      const url = `${weatherURL}/weather?lat=${location.center.lat}&lon=${location.center.lng}&appid=${wApiKey}`;
      const data = await getAxiosData(url);
      setWInfo(data.weather[0].id);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const getHospital = async () => {
    try {
      setLoading(true);
      const url = hospitalURL;
      const res = await getAxiosData(String(url));

      if (res.length > 0) {
        setHospitalList(res);
        setHotelList([]);
        setHotelTemp([]);
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error(err);
      setLoading(true);
    }
  };

  const getHotel = async () => {
    try {
      setLoading(true);
      const url = hotelURL;
      const res = await getAxiosData(String(url));

      if (res.length > 0) {
        setHotelTemp(res);
        setHospitalList([]);
        setLoading(false);
      }
    } catch (err) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        errMsg: "Can't access geolocation",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (!hotelTemp) return;
    hotelTemp?.map((item: HotelType) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(item.ldgs_addr, function (result, status) {
        if (status === "OK") {
          const arr: LocationType[] = [];
          arr.push({
            fclty_la: result[0].y,
            fclty_lo: result[0].x,
          });

          setHotelList((prev) => {
            return [...prev, arr[0]];
          });
        }
      });
    });
  }, [hotelTemp]);

  const MarkerItem = (
    idx: number,
    item: LocationType,
    mapInstance: MapFuncType | null
  ): MarkerType => {
    const lat: number = Number(item.fclty_la);
    const lng: number = Number(item.fclty_lo);

    const obj: MarkerType = {
      key: `${lat}-${lng}-${idx}`,
      position: { lat, lng },
      img: { src: "https://cdn-icons-png.flaticon.com/128/3062/3062089.png" },
      onClick: () => moveLocation(mapInstance, lat, lng),
    };

    return obj;
  };

  return (
    <>
      {loading && (
        <Alert style={{ zIndex: 1001 }}>
          <AlertTitle>병원 정보를 로드중입니다 </AlertTitle>
          <AlertDescription>잠시만 기다려주세요.</AlertDescription>
        </Alert>
      )}
      {scriptLoad ? (
        <>
          현재 위치 날씨: {weatherTitle[wInfo]}
          <div className="flex justify-between w-[50%]">
            <Button onClick={getHospital}>동물 병원 찾기</Button>
            <Button onClick={getHotel}>애완동물 동반 호텔</Button>
          </div>
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin />
            </div>
          )}
          <Map
            center={{
              lat: location.center.lat,
              lng: location.center.lng,
            }}
            style={{ width: "800px", height: "600px" }}
            level={3}
            onCreate={(map) => setMapInstance(map)}
          >
            <CustomMaker
              position={{
                lat: location.center.lat,
                lng: location.center.lng,
              }}
              img={{
                src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
              }}
            />

            {hospitalList?.map((item: LocationType, idx: number) => (
              <CustomMaker {...MarkerItem(idx, item, mapInstance)} />
            ))}

            {hotelList?.map((item: LocationType, idx: number) => (
              <CustomMaker {...MarkerItem(idx, item, mapInstance)} />
            ))}
          </Map>
        </>
      ) : (
        <div>페이지 로딩중입니다.</div>
      )}
    </>
  );
};

export default LocationMap;
