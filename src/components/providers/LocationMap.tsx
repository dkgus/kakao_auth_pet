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
  const [reset, setReset] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<MapFuncType | null>(null);
  const [location, setLocation] = useState<{
    center: { lat: number; lng: number };
    errMsg: string;
    isLoading: boolean;
  }>({
    center: {
      lat: 0,
      lng: 0,
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
    } catch (err: unknown) {
      console.error(err);

      setLoading(true);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({
            ...prev,
            center: { lat: latitude, lng: longitude },
            errMsg: "",
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

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
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
      geocoder.addressSearch(item.ldgs_addr, (result, status) => {
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

  const handleMapDrag = (map: kakao.maps.Map) => {
    const center = map.getCenter();

    const isLocationDifferent =
      Math.abs(center.getLat() - location.center.lat) > 0.0001 ||
      Math.abs(center.getLng() - location.center.lng) > 0.0001;

    setReset(isLocationDifferent);
  };

  const onReset = async () => {
    if (mapInstance && location.center.lat && location.center.lng) {
      mapInstance.setCenter(
        new kakao.maps.LatLng(location.center.lat, location.center.lng)
      );
      setReset(false);
    }
  };

  const MarkerItem = (
    item: LocationType,
    mapInstance: MapFuncType | null
  ): MarkerType => {
    const lat: number = Number(item.fclty_la);
    const lng: number = Number(item.fclty_lo);

    return {
      position: { lat, lng },
      img: { src: "https://cdn-icons-png.flaticon.com/128/3062/3062089.png" },
      onClick: () => moveLocation(mapInstance, lat, lng),
    };
  };

  return (
    <>
      {loading && (
        <Alert style={{ zIndex: 1001 }}>
          <AlertTitle>로드중입니다 </AlertTitle>
          <AlertDescription>잠시만 기다려주세요.</AlertDescription>
        </Alert>
      )}
      {scriptLoad ? (
        <>
          현재 위치 날씨: {weatherTitle[wInfo]}
          <div className="flex justify-between w-[50%]">
            <Button onClick={getHospital}>동물 병원 찾기</Button>
            <Button onClick={getHotel}>애완동물 동반 호텔</Button>
            {reset && <Button onClick={onReset}>내 위치로 돌아가기</Button>}
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
            isPanto={true}
            style={{ width: "800px", height: "600px" }}
            level={3}
            onCreate={(map) => {
              setMapInstance(map);
              kakao.maps.event.addListener(map, "dragend", () =>
                handleMapDrag(map)
              );
            }}
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
              <CustomMaker key={idx} {...MarkerItem(item, mapInstance)} />
            ))}

            {hotelList?.map((item: LocationType, idx: number) => (
              <CustomMaker key={idx} {...MarkerItem(item, mapInstance)} />
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
