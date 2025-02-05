import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

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
