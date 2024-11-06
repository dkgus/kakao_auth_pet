"use client";

import LocationMap from "@/components/providers/LocationMap";
import { layoutCSS } from "@/lib/constants";

export default function Home() {
  return (
    <div className={layoutCSS}>
      <LocationMap />
    </div>
  );
}
