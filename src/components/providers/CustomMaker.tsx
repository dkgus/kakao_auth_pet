import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

interface MarkerType {
  position: { lat: number; lng: number };
  img: { src: string; alt?: string };
  onClick?: () => void;
}

const CustomMaker = ({ position, img, onClick }: MarkerType) => {
  return (
    <MapMarker
      position={position}
      onClick={onClick}
      image={{
        src: img.src,
        size: {
          width: 50,
          height: 50,
        },
      }}
    />
  );
};

export default CustomMaker;
