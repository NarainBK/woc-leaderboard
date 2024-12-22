import prisma from "@/app/db";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  'use cache'
  cacheLife('minutes');
  // Fetch all participants from the leaderboard based on bounty and return 
  try {
    const data = await prisma.participant.findMany({
      select: {
        fullName: true,
        username: true,
        bounty: true,
        accountActive: true,
        _count: {
          select: {
            Solution: true
          }
        }
      },
      orderBy: {
        bounty: 'desc',
      },
    });
    return NextResponse.json(
      {
        leaderboard: data
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error"
      },
      {
        status: 500
      }
    )
  }
}
