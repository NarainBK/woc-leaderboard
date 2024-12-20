import Github from "next-auth/providers/github";
import prisma from "../db";
import { NextAuthOptions } from "next-auth";

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      // @ts-ignore
      const username: string = profile.login;
      try {
        const check = await prisma.participant.findFirst({
          where: {
            username: username
          }
        });
        // Account does not exist or banned account
        if (!check || check.accountActive === false) {
          return false;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      return session;
    }
  }
}

// TODO: Add Rate Limit to the login endpoint
