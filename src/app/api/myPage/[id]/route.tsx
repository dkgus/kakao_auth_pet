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
  hotelInfo: any;
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
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: userData });
  } catch (err) {
    console.error("Error parsing body:", err);
    return NextResponse.json(
      { error: "데이터 로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.json();
  const { userId, reserveId } = body;

  try {
    if (!userId || !reserveId) {
      return NextResponse.json(
        { error: "파라미터가 없습니다.", code: 400 },
        { status: 400 }
      );
    }
    const db = await getDb();

    const userData = await db.collection("User").findOne({ id: userId });

    if (!userData) {
      return NextResponse.json(
        { error: "유저 정보가 존재하지 않습니다.", code: 400 },
        { status: 404 }
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
        { error: "삭제가 실패했습니다.", code: 500 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "삭제가 성공적으로 되었습니다", code: 200 },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error parsing body:", err);
    return NextResponse.json(
      { error: "데이터 삭제 중 오류가 발생했습니다.", code: 500 },
      { status: 500 }
    );
  }
}
