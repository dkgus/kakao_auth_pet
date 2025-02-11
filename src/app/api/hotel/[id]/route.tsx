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
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();

    const existingUser = await db
      .collection("User")
      .findOne({ id: body.userId });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!ObjectId.isValid(body.hotelId)) {
      return NextResponse.json(
        { error: "Invalid hotel ID format" },
        { status: 400 }
      );
    }

    const hotelId = new ObjectId(body.hotelId);
    const reserveId = new ObjectId();

    const hotelInfo = await db
      .collection("HotelList")
      .findOne({ _id: hotelId });

    if (!hotelInfo) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    const newReservation = {
      ...body,
      reserveId,
      hotelInfo,
    };

    const updatedUser = await db
      .collection("User")
      .updateOne({ id: body.userId }, { $push: { hotelList: newReservation } });

    if (updatedUser.modifiedCount === 0) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ status: 200, message: "UPDATE_HOTEL_SUCCESS" });
  } catch (err) {
    console.error("Error updating hotel:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
