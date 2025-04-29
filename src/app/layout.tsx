import LoginButton from "@/components/login-button";
import CustomMenu from "@/components/providers/CustomMenu";
import AuthSession from "@/components/providers/session-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";

import CustomLogo from "@/components/providers/CustomLogo";
import { mainBgColor } from "@/lib/constants";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Oh My Pet",
  description: "반려동물 올케어 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:w-[80%] sm:w-[100%] m-auto h-full`}
      >
        <AuthSession>
          <div
            className={`h-[48px] flex items-center ${mainBgColor} justify-between px-5`}
          >
            <div>
              <CustomMenu
                type="l_down"
                menuList={[
                  // { key: "event", value: "이벤트 페이지" },
                  { key: "hotel", value: "반려동물 호텔 예약" },
                  { key: "qna", value: "Q&A 게시판" },
                ]}
              />
            </div>
            <CustomLogo />
            <div>
              <LoginButton />
            </div>
          </div>
          {children}
          <Toaster />
        </AuthSession>
      </body>
    </html>
  );
}
