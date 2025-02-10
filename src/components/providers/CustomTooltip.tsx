import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import MultiIcon from "@/components/icons/MultiIcon";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

const CustomTooltip = (props: {
  btnClass: string;
  icon: IconDefinition;
  text?: string;
  type: string;
  value?: string;
  onClick?: () => Promise<void> | void;
}) => {
  const { btnClass, type, icon, text, onClick, value } = props;

  return (
    <TooltipProvider delayDuration={1}>
      {type === "icnBtn" ? (
        <Tooltip>
          <TooltipTrigger>
            <Button className={btnClass} onClick={onClick}>
              <MultiIcon icon={icon} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <span className="pr-1">
              {String(value).substring(0, 8) + "..."}
            </span>
            <button onClick={onClick}>
              <MultiIcon icon={icon} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <span className="bg-orange-100">{value}</span>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
};

export default CustomTooltip;
