import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      period?: string | null;
      image?: string | null;
      petNm?: string | null;
      petType?: string | null;
      memo?: string | null;
    };
  }
}

const clientPromise = MongoClient.connect(process.env.MONGODB_URI || "");

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db("User");
      //const databases = await client.db().admin().listDatabases();
      const existingUser = await db.collection("User").findOne({ id: user.id });
      if (!existingUser) {
        await db.collection("User").insertOne({
          id: user.id,
          name: user.name,
          petNm: "",
        });
      }
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },

    async session({ session, token }) {
      const client = await clientPromise;
      const db = client.db("User");
      const user = await db.collection("User").findOne({ id: token.sub });
      session.userId = token.sub;
      session.user = {
        ...session.user,
        petNm: user?.petNm,
        period: user?.period,
        petType: user?.petType,
        phone: user?.phone,
        memo: user?.memo,
        image: user?.imgUrl,
        email: user?.email,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
