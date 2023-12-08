import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@auth/xata-adapter";
import { XataClient } from "./utils/xata";

const client = new XataClient();

export const authConfig = {
  debug: true,
  adapter: XataAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({
      session,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
