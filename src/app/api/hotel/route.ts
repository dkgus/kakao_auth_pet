import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from "mongodb";
import { getDb } from "@/lib/db";

const clientPromise = MongoClient.connect(process.env.MONGODB_URI || "");

export async function GET(req: NextRequest) {
  const db = await getDb();
  const hotelListCollection = db.collection("HotelList");

  const hotels = await hotelListCollection.find().toArray();
  const access = hotels.filter(
    (v) => !v.pet_info_cn.includes("['반려동물 동반 불가']")
  );

  return NextResponse.json({ hotels: access });
}
