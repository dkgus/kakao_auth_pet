import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  // response.headers.set("Cache-Control", "no-store, must-revalidate");
  response.headers.set("Cache-Control", "public, max-age=86400");
  if (pathname === "/hotel") {
    return response;
  }

  const token = await getToken({ req: request });

  if (token) {
    return response;
  }

  const kakaoAuthUrl = new URL("/api/auth/signin", request.url);
  //https://kakao-auth-pet.vercel.app/api/auth/signin
  kakaoAuthUrl.searchParams.append(
    "client_id",
    process.env.KAKAO_CLIENT_ID ?? ""
  );
  kakaoAuthUrl.searchParams.append("response_type", "code");

  return NextResponse.redirect(kakaoAuthUrl);
}

export const config = { matcher: ["/hotel/:id*"] };
