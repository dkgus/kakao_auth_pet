"use client";

import LocationMap from "@/components/providers/LocationMap";

export default function Home() {
  return (
    <div className="bg-[#FAF7F0] h-[calc(100vh-48px)]">
      <LocationMap />
    </div>
  );
}
