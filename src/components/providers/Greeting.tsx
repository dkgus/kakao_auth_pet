import React from "react";
import { Badge } from "@/components/ui/badge";
import MultiIcon from "@/components/icons/MultiIcon";
import { weatherTitle } from "@/lib/utils";

const Greeting = (props: { weather: number; add: string }) => {
  const { weather, add } = props;
  return (
    <div className="flex gap-3 w-[90%] m-auto py-3">
      <Badge>위치:{add}</Badge>
      <Badge variant="destructive">
        날씨: {weatherTitle[weather]?.title}
        <div className="pl-2">
          <MultiIcon icon={weatherTitle[weather]?.icon} />
        </div>
      </Badge>
    </div>
  );
};

export default Greeting;
