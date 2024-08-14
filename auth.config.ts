import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { db } from "./src/db/drizzle-client";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [Google],
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
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
  pages: {
    signIn: "/signin", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
