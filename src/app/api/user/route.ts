import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import cloudinary from "@/lib/cloudinary";

interface FormType {
  userId?: string;
  name: string;
  phone: string;
  period: string;
  petNm: string;
  petType: string;
  email?: string;
  img?: File | null;
  imgUrl?: string;
}

interface UploadResult {
  secure_url: string;
}

export async function POST(req: Request) {
  if (!req.body) {
    return NextResponse.json(
      { message: "Request body is empty" },
      { status: 400 }
    );
  }

  const formData = await req.formData();

  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const period = formData.get("period") as string;
  const petNm = formData.get("petNm") as string;
  const petType = formData.get("petType") as string;
  const email = formData.get("email") as string;

  const img = formData.get("img") as File | null;

  if (!userId) {
    return NextResponse.json({ message: "NO_USER" }, { status: 400 });
  }

  let imageUrl: string | null = null;

  if (img) {
    try {
      const arrayBuffer = await img.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "user-images" }, (error, result) => {
            if (error) reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = (uploadResult as UploadResult).secure_url;
    } catch (uploadError) {
      return NextResponse.json(
        { message: "UPDATE_USER_FAIL", error: uploadError },
        { status: 500 }
      );
    }
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI || "");
    const db = client.db("User");

    const updateFields: FormType = {
      name,
      phone,
      email,
      period,
      petNm,
      petType,
    };

    if (imageUrl) {
      updateFields.imgUrl = imageUrl;
    }

    const user = await db
      .collection("User")
      .updateOne({ id: userId }, { $set: updateFields });

    return NextResponse.json(
      { message: "UPDATE_USER_SUCCESS", status: 200, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "UPDATE_USER_FAIL", error },
      { status: 500 }
    );
  }
}
