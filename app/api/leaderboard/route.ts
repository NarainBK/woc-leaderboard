import prisma from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(_req: NextApiRequest, res: NextApiResponse) {
  // Fetch all participants from the leaderboard based on bounty and return 
  try {
    const data = await prisma.participant.findMany({
      select: {
        fullName: true,
        username: true,
        bounty: true,
        accountActive: true,
        Solution: true,
      },
      orderBy: {
        bounty: 'desc',
      },
    });
    return res.status(200).json(
      {
        leaderboard: data
      },
    );
  } catch (error) {
    return res.status(500).json(
      {
        message: "Internal Server Error"
      },
    )
  }
}
