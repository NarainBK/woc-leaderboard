import prisma from "@/app/db";
import { NEXT_AUTH } from "@/app/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized access! Not logged in."
      },
      {
        status: 403
      }
    );
  }

  // Validating username
  const url = request.nextUrl;
  const username = url.searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      {
        error: "Bad Request"
      },
      {
        status: 400
      }
    );
  }

  const validUsername = z.string().regex(/^[a-zA-Z0-9-]+$/).safeParse(username);
  if (!validUsername.success) {
    return NextResponse.json(
      {
        error: "Bad Request"
      },
      {
        status: 400
      }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.participant.findFirst({
        where: {
          username: validUsername.data,
          accountActive: true,
        }
      });

      if (!user) {
        throw new Error("Account does not exist");
      }

      // If user exists, return the user along with issue count
      const issues = await tx.issue.findMany({
        where: {
          claimedBy: user.username,
          issueStatus: false,
        },
        select: {
          issueStatus: true,
          url: true
        }
      });
      const issueCount: number = issues.filter(i => i.issueStatus === false).length;

      return {
        fullname: user.fullName,
        rollNumber: user.rollNumber,
        username: user.username,
        issues: issues,
        issueCount: issueCount,
        bounty: user.bounty
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}
