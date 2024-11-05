import React from "react";
import { Badge } from "@/components/ui/badge";
const Greeting = (props: { weather: string; add: string }) => {
  const { weather, add } = props;
  return (
    <div className="flex gap-3 w-[90%] m-auto py-3">
      <Badge>위치:{add}</Badge>
      <Badge variant="destructive">날씨:{weather}</Badge>
    </div>
  );
};

export default Greeting;
