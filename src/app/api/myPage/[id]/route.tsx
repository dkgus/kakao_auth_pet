import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export type selectedHotel = {
  username: string;
  revName: string;
  date: string;
  visitMethod: string;
  userId: string;
  hotelId: string;
  reserveId: string;
  hotelInfo: {
    _id: object;
    ldgs_nm: string;
    ctprvn_nm: string;
    gugun_nm: string;
    ldgs_addr: string;
    pet_info_cn: string;
    imageUrl: string;
  };
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const db = await getDb();
    const userData = await db.collection("User").findOne({ id });

    if (!id) {
      return NextResponse.json({ error: "NO_USER" }, { status: 400 });
    }

    return NextResponse.json({ data: userData });
  } catch (err) {
    console.error("Error parsing body:", err);
    return NextResponse.json({ error: "GET_HOTEL_LIST" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const body = await request.json();
  const { userId, reserveId } = body;

  try {
    if (!userId || !reserveId) {
      return NextResponse.json(
        { error: "NO_PARAMS", code: 400 },
        { status: 400 }
      );
    }
    const db = await getDb();

    const userData = await db.collection("User").findOne({ id: userId });

    if (!userData) {
      return NextResponse.json(
        { error: "NO_USER", code: 400 },
        { status: 500 }
      );
    }

    const newArr = userData?.hotelList.filter(
      (i: selectedHotel) => i.reserveId.toString() !== reserveId
    );

    const result = await db
      .collection("User")
      .updateOne({ id: userId }, { $set: { hotelList: newArr } });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "DELETE_HOTEL", code: 500 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "DELETE_HOTEL", code: 200 },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error parsing body:", err);
    return NextResponse.json(
      { error: "DELETE_HOTEL", code: 500 },
      { status: 500 }
    );
  }
}
