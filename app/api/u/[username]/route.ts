import prisma from "@/app/db";
import { NEXT_AUTH } from "@/app/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session) {
    return res.status(403).json(
      {
        message: "Unauthorized access! Not logged in."
      },
    );
  }

  const { query: { username } } = req;
  const validUsername = z.string().regex(/^[a-zA-Z0-9-]+$/).safeParse(username);
  if (!validUsername.success) {
    return res.status(400).json(
      {
        message: "Bad Request,"
      },
    );
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.participant.findFirst({
        where: {
          username: validUsername.data,
          accountActive: true,
        }
      });
      if (!user) {
        return res.status(404).json(
          {
            message: "Account does not exist"
          },
        );
      }

      // If user exists, return the user along with issue count
      const issues = await tx.issue.findMany({
        where: {
          claimedBy: user.username,
        },
        select: {
          issueStatus: true,
          url: true
        }
      });
      const issueCount: number = issues.filter(i => i.issueStatus === false).length;

      return res.status(200).json(
        {
          fullname: user.fullName,
          rollNumber: user.rollNumber,
          username: user.username,
          issues: issues,
          issueCount: issueCount,
          bounty: user.bounty
        },
      );
    });
  } catch (error) {
    return res.status(500).json(
      {
        message: "Internal Server Error",
      },
    );
  }
}
