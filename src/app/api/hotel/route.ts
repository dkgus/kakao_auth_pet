import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await getDb();
  const hotelListCollection = db.collection("HotelList");

  const hotels = await hotelListCollection.find().toArray();
  const access = hotels.filter(
    (v) => !v.pet_info_cn.includes("['반려동물 동반 불가']")
  );

  return NextResponse.json({ hotels: access });
}
