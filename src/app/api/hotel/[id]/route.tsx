import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const db = await getDb();
    const hotelListCollection = db.collection("HotelList");

    const hotel = await hotelListCollection.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ hotel });
  } catch (err) {
    console.error("오류가 발생했습니다.", err);
    return NextResponse.json(
      { error: "오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
