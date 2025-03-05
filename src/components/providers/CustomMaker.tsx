import React, { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface MarkerType {
  position: { lat: number; lng: number };
  img: { src: string; alt?: string };
  onClick?: (() => void) | undefined;
  info?: { nm: string; location: string };
}

const CustomMaker = ({ position, img, onClick, info }: MarkerType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MapMarker
        position={position}
        onClick={() => {
          if (
            onClick &&
            (img.src === "/hospital.png" || img.src === "/hotel.png")
          ) {
            onClick();
            setIsOpen((prev) => !prev);
          }
        }}
        clickable={true}
        image={{
          src: img.src,
          size: {
            width: 50,
            height: 50,
          },
        }}
      />
      {isOpen && (
        <CustomOverlayMap position={position} clickable={false}>
          <div className="wrap bg-[#fff] bg-opacity-90 border border-[#FFB200] p-3 rounded absolute z-10 right-[-110px] top-[-130px]">
            <div className="info">
              <div className="title flex justify-between items-center">
                {info?.nm}
                <div
                  className="close cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  title="닫기"
                >
                  x
                </div>
              </div>
              <div className="body">
                <div className="desc">
                  <div className="ellipsis text-[13px] text-[gray]">
                    {info?.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CustomMaker;
