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
    <Menubar className="w-[95px]">
      {type.map((item, idx) => (
        <div key={idx}>
          <MenubarMenu>
            <MenubarTrigger>
              <MultiIcon
                icon={iconType[item]}
                onClick={() => {
                  if (item === "hospital") {
                    getHospital();
                  } else {
                    getHotel();
                  }
                }}
              />
            </MenubarTrigger>
          </MenubarMenu>
        </div>
      ))}
    </Menubar>
  );
};

export default RadioMenu;
