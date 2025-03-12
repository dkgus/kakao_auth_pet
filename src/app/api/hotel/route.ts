import axios from "axios";

import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

import { imgURL } from "@/lib/constants";
import { NextResponse } from "next/server";

interface QueryType {
  pet_info_cn?: { $not: { $regex: string } };
  ldgs_nm?: { $regex: string; $options: string };
}

const PAGE_LIMIT = 6;
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const searchQuery = url.searchParams.get("name") || "";
  const limit = PAGE_LIMIT;
  const query: QueryType = {};
  const db = await getDb();
  const hotelListCollection = db.collection("HotelList");

  try {
    query.pet_info_cn = {
      $not: { $regex: "\\['반려동물 동반 불가'\\]" },
    };

    if (searchQuery) {
      query.ldgs_nm = { $regex: searchQuery, $options: "i" };
    }

    const hotels = await hotelListCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const { data: images } = await axios.get(
      `${imgURL}?page=${page}&limit=${limit}&w=500&h=120&fit=crop&q=50&fm=webp`
    );

    const updatedHotels = await Promise.all(
      hotels.map(async (hotel, index) => {
        const imageUrl = images[index]?.download_url || "";

        await hotelListCollection.updateOne(
          { _id: new ObjectId(hotel._id) },
          { $set: { imageUrl } }
        );

        return { ...hotel, imageUrl };
      })
    );

    return NextResponse.json({ hotels: updatedHotels });
  } catch (err) {
    console.error("데이터 로드 오류:", err);
    return NextResponse.json(
      { error: "데이터 로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
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
    const obj = {
      ...body,
      reserveId,
    };
    const totalInfo = { ...obj, hotelInfo };

    const updatedUser = await db.collection("User").updateOne(
      { id: body.userId },
      {
        $addToSet: { hotelList: totalInfo },
      }
    );

    if (updatedUser.modifiedCount === 0) {
      return NextResponse.json({
        status: 400,
        message: "CREATE_HOTEL_FAIL_DEP",
      });
    } else {
      return NextResponse.json({ status: 200, message: "CREATE_HOTEL" });
    }
  } catch (err) {
    console.error("Error parsing body:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
