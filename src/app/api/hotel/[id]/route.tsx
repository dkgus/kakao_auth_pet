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
    console.error("err", err);
    return NextResponse.json({ error: "ERROR" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();

    // 유저 확인
    const existingUser = await db
      .collection("User")
      .findOne({ id: body.userId });

    if (!existingUser) {
      return NextResponse.json({ error: "UPDATE_HOTEL_FAIL" }, { status: 404 });
    }

    // 호텔 ID 확인 및 변환
    if (!ObjectId.isValid(body.hotelId)) {
      return NextResponse.json({ error: "UPDATE_HOTEL_FAIL" }, { status: 400 });
    }
    const hotelId = await new ObjectId(body.hotelId);

    // 기존 예약 ID 확인
    if (!body.reserveId || !ObjectId.isValid(body.reserveId)) {
      return NextResponse.json({ error: "UPDATE_HOTEL_FAIL" }, { status: 400 });
    }
    const reserveId = await new ObjectId(body.reserveId);

    // 호텔 정보 조회
    const hotelInfo = await db
      .collection("HotelList")
      .findOne({ _id: hotelId });

    if (!hotelInfo) {
      return NextResponse.json({ error: "UPDATE_HOTEL_FAIL" }, { status: 404 });
    }

    // 새로운 예약 정보 생성
    const newReservation = {
      ...body,
      reserveId,
      hotelInfo,
    };

    // 기존 예약이 있는지 확인
    const existingReservation = await db.collection("User").findOne({
      id: body.userId,
      "hotelList.reserveId": reserveId,
    });

    if (existingReservation) {
      const updateResult = await db
        .collection("User")
        .updateOne(
          { id: body.userId, "hotelList.reserveId": reserveId },
          { $set: { "hotelList.$": newReservation } }
        );

      if (updateResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: "UPDATE_HOTEL_FAIL" },
          { status: 500 }
        );
      }
    } else {
      const insertResult = await db
        .collection("User")
        .updateOne(
          { id: body.userId },
          { $push: { hotelList: newReservation } }
        );

      if (insertResult.modifiedCount === 0) {
        return NextResponse.json(
          { error: "UPDATE_HOTEL_FAIL" },
          { status: 500 }
        );
      }
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
