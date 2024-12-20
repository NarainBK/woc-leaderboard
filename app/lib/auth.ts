import Github from "next-auth/providers/github";
import prisma from "../db";

export const NEXT_AUTH = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }: any) {
      // @eslint-disable-next-line @typescript-eslint/no-explicit-any
      const username = profile.login;
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
    // @eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
}

// TODO: Add Rate Limit to the login endpoint
