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
        message: "Unauthorized access! Not logged in."
      },
      {
        status: 403
      }
    );
  }

  // Validating username
  const url = request.nextUrl;
  const username = url.searchParams.get('username');
  if (!username) {
    return NextResponse.json(
      {
        message: "Bad Request."
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
        message: "Bad Request."
      },
      {
        status: 400
      }
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
        return NextResponse.json(
          {
            message: "Account does not exist"
          },
          {
            status: 404
          }
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

      return NextResponse.json(
        {
          fullname: user.fullName,
          rollNumber: user.rollNumber,
          username: user.username,
          issues: issues,
          issueCount: issueCount,
          bounty: user.bounty
        },
        {
          status: 200
        }
      );
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500
      }
    );
  }
}
