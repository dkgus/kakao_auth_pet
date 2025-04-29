import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

import MultiIcon from "@/components/icons/MultiIcon";
import { faStethoscope, faHotel } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type IconKey = "hospital" | "hotel";

const RadioMenu = (props: {
  type: IconKey[];
  getHospital: () => void;
  getHotel: () => void;
}) => {
  const { type, getHospital, getHotel } = props;

  const iconType: Record<IconKey, IconDefinition> = {
    hospital: faStethoscope,
    hotel: faHotel,
  };

  return (
    <Menubar className="w-[100px] py-7">
      {type.map((item, idx) => (
        <div key={idx}>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <div
                onClick={() => {
                  if (item === "hospital") getHospital();
                  if (item === "hotel") getHotel();
                }}
                className="flex flex-col items-center cursor-pointer"
              >
                <MultiIcon icon={iconType[item]} />
                <div className="text-[10px]">{idx === 0 ? "병원" : "호텔"}</div>
              </div>
            </MenubarTrigger>
          </MenubarMenu>
        </div>
      ))}
    </Menubar>
  );
};

export default RadioMenu;
