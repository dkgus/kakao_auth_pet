import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/hotel") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.next();
  }

  const callbackUrl = encodeURIComponent(`${pathname}${search}`);
  const kakaoAuthUrl = new URL(
    "/api/auth/callback/kakao",

    request.url
  );
  kakaoAuthUrl.searchParams.append(
    "client_id",
    process.env.KAKAO_CLIENT_ID ?? ""
  );

  // kakaoAuthUrl.searchParams.append(
  //   "redirect_uri",
  //   `${request.nextUrl.origin}/api/auth/callback/kakao`
  // );
  kakaoAuthUrl.searchParams.append("response_type", "code");

  return NextResponse.redirect(kakaoAuthUrl);
}

export const config = { matcher: ["/hotel/:id*"] };
