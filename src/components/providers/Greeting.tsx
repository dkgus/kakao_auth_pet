import React from "react";
import { Badge } from "@/components/ui/badge";
import MultiIcon from "@/components/icons/MultiIcon";
import { weatherTitle } from "@/lib/utils";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
const Greeting = (props: { weather: number; add: string }) => {
  const { weather, add } = props;
  return (
    <div className="flex gap-3 w-[90%] m-auto pb-[10px]">
      <Badge>위치:{add}</Badge>
      <Badge variant="destructive">
        날씨: {weatherTitle[weather]?.title}
        <div className="pl-2">
          <MultiIcon icon={weatherTitle[weather]?.icon || faQuestionCircle} />
        </div>
      </Badge>
    </div>
  );
};

export default Greeting;
