import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomCard = () => {
  return (
    <Card className="h-[250px]">
      <CardHeader className="m-0 p-0">
        <img
          style={{ maxHeight: "100px" }}
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
      </CardHeader>
      <CardContent className="pt-3">
        <CardTitle>Card Title</CardTitle>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
