"use client";

import React, { useEffect, useState } from "react";
import { getAxiosData } from "@/lib/axiosData";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { weatherTitle } from "@/lib/utils";
import { weatherURL } from "@/lib/constants";

const LocationMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const wApiKey: string | undefined = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const hospitalKey: string | undefined = process.env.NEXT_PUBLIC_HOSPITAL_KEY;
  const hospitalURL: string | undefined = process.env.NEXT_PUBLIC_HOSPITAL_URL;

  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [wInfo, setWInfo] = useState<number>(0);
  const [mapInstance, setMapInstance] = useState<object>({});
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
  const [hList, setHList] = useState<string[]>([]);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
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
      getHospital();
    }
  }, [location, wApiKey, hospitalKey]);

  const getWeather = async () => {
    try {
      const url = `${weatherURL}/weather?lat=${location.center.lat}&lon=${location.center.lng}&appid=${wApiKey}`;
      const data = await getAxiosData(url);
      setWInfo(data.weather[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const getHospital = async () => {
    try {
      const url = hospitalURL;
      const res = await getAxiosData(url);

      if (res.length > 0) {
        setHList(res);
      }
    } catch (err) {
      console.log(err);
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
        errMsg: "cant access geolocation",
        isLoading: false,
      }));
    }
  }, []);
  return (
    <>
      {scriptLoad ? (
        <>
          현재 위치 날씨 :{weatherTitle[wInfo]}
          <Map
            center={{
              lat: location.center.lat,
              lng: location.center.lng,
            }}
            style={{ width: "800px", height: "600px" }}
            level={3}
            onCreate={setMapInstance}
          >
            <MapMarker
              position={{
                lat: location.center.lat,
                lng: location.center.lng,
              }}
              image={{
                src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
                size: {
                  width: 50,
                  height: 50,
                },
              }}
            />
            {hList &&
              hList.map((item, idx) => {
                return (
                  <MapMarker
                    key={`${location.center}-${idx}`}
                    position={{
                      lat: item.fclty_la,
                      lng: item.fclty_lo,
                    }}
                    onClick={() =>
                      mapInstance?.panTo(
                        new kakao.maps.LatLng(item.fclty_la, item.fclty_lo)
                      )
                    }
                    image={{
                      src: "https://cdn-icons-png.flaticon.com/128/3062/3062089.png",
                      size: {
                        width: 50,
                        height: 50,
                      },
                    }}
                  />
                );
              })}
          </Map>
        </>
      ) : (
        <div>페이지 로딩중입니다.</div>
      )}
    </>
  );
};

export default LocationMap;
