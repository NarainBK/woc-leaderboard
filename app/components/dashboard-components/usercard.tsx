"use client";
import Image from "next/image";
import { Card, CardDescription } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import { BackgroundGradient } from "../ui/background-gradient";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
interface UserCardProps {
  githubId: string;
  currentRank: string;
  prMergedCount: number;
  completedBounties: number;
  totalBountyPoints: number;
  activeBountyProjects: ActiveBountyProject[] | undefined;
  name: string;
}

// TODO: This is not needed
interface ActiveBountyProject {
  projectTitle: string;
  issueNumber: number;
  bountyPoints: number;
}

// TODO: Turn this into a recoil state
const UserCardData: UserCardProps = {
  name: "Ritesh Koushik",
  githubId: "IAmRiteshKoushik",
  currentRank: "0",
  prMergedCount: 10,
  completedBounties: 5,
  totalBountyPoints: 100,
  activeBountyProjects: [
    {
      projectTitle: "Project 1",
      issueNumber: 1,
      bountyPoints: 20,
    },
    {
      projectTitle: "Project 2",
      issueNumber: 2,
      bountyPoints: 30,
    },
  ],
};

/* Incoming Data will have the following:
 * 1. Full name
 * 2. GitHub username
 * 3. Bounty earned
 * 4. PRs merged
 * 5. Total issues
 * 6. Incomplete issues
 * 7. Ranking is to be derived from the leaderboard data recoil state
 */

const getUserData = async (): Promise<UserCardProps | null> => {
  const { data: session } = useSession();
  const UserName = session?.user?.name ?? "defaultUsername"; // Derive username from session data
  try {
    const response = await fetch(`/api/user?username=${UserName}`, {
      method: "GET",
    });
    if (response.status !== 200) {
      return null; // Return null if status is not 200
    }
    // Await the json method to get actual data
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.log(error); // Log the error
    return null; // Return null if an error occurs
  }
};

const UserCard = () => {
  // TODO: Bring in the recoil state which would contain all the necessary data
  const [loading, isLoading] = useState<boolean>(true);
  const [UserData, setUserData] = useRecoilState(LeaderBoardState);
  useEffect(() => {
    (async () => {
      const result = await getUserData();
      if (result) {
        setUserData(result); // Update Recoil state with the fetched data
      }
      if (result !== true) {
        isLoading(true);
        return;
      }
      isLoading(false);
      return;
    })();
  });

  const isDataValid =
    UserCardData &&
    UserCardData.githubId &&
    UserCardData.currentRank &&
    UserCardData.prMergedCount !== undefined &&
    UserCardData.completedBounties !== undefined &&
    UserCardData.totalBountyPoints !== undefined &&
    UserCardData.name;

  if (!isDataValid) {
    return (
      <div className="mx-4">
        <BackgroundGradient className="py-4">
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="px-6 pt-6 text-center text-gray-300">
              <h2 className="text-2xl text-[#c8c7cc] font-semibold">
                Can't fetch user data currently.
              </h2>
              <p>Please check back later or contact support.</p>
            </div>
          </Card>
        </BackgroundGradient>
      </div>
    );
  }

  return (
    <div className="mx-4">
      <BackgroundGradient className="py-4">
        <Spotlight fill="blue" />
        <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
          <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
            <div className="text-8xl text-[#ffcc00] font-bold animate-glow">
              {UserCardData.currentRank}
            </div>
          </div>

          <div className="flex justify-between items-center px-6 pt-8 space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={`https://github.com/${UserCardData.githubId}.png`}
                alt={`${UserCardData.githubId} profile`}
                width={128}
                height={128}
                className="rounded-lg border-2"
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl text-[#6ee7b7] font-semibold">
                {UserCardData.name}
              </h2>
              <p className="text-lg text-right text-gray-300">
                @{UserCardData.githubId}
              </p>
            </div>
          </div>

          <div className="space-y-4 px-6 pt-6">
            <CardDescription className="text-xl text-gray-300">
              🏆 <strong>{UserCardData.prMergedCount}</strong> pull requests
              successfully merged!
            </CardDescription>

            <CardDescription className="text-xl text-gray-300">
              🎯 You&apos;ve earned a total of{" "}
              <strong>{UserCardData.totalBountyPoints}</strong> bounty points
              from <strong>{UserCardData.completedBounties}</strong> completed
              bounties.
            </CardDescription>

            <CardDescription className="text-xl text-gray-300">
              🔥 You have contributed to{" "}
              <strong>{UserCardData.activeBountyProjects?.length || 0}</strong>{" "}
              active projects:
            </CardDescription>
          </div>

          <div className="px-6 space-y-4 py-4">
            {UserCardData.activeBountyProjects &&
            UserCardData.activeBountyProjects.length > 0 ? (
              UserCardData.activeBountyProjects.map((project) => (
                <div
                  key={project.issueNumber}
                  className="bg-[#1d1b2e] p-4 rounded-lg"
                >
                  <h4 className="text-lg text-[#6ee7b7] font-semibold">
                    {project.projectTitle}
                  </h4>
                  <p className="text-sm text-gray-400">
                    Issue #{project.issueNumber}
                  </p>
                  <p className="text-sm text-gray-400">
                    💰 {project.bountyPoints} Bounty Points
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-[#1d1b2e] p-4 rounded-lg">
                <p className="text-sm text-gray-400">
                  You have no active bounty projects at the moment.
                </p>
              </div>
            )}
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  );
};

export default UserCard;
