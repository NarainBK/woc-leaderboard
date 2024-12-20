"use client";
import Image from "next/image";
import { Card, CardDescription } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import { BackgroundGradient } from "../ui/background-gradient";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import  secureLocalStorage  from  "react-secure-storage";

interface UserCardProps {
  githubId: string;
  currentRank: string;
  prMergedCount: number;
  TotalIssues:number;
  InCompleteIssues:number;
  // completedBounties: number;
  totalBountyPoints: number;
  // activeBountyProjects: ActiveBountyProject[] | undefined;
  name: string;
}

// TODO: This is not needed
// interface ActiveBountyProject {
//   projectTitle: string;
//   issueNumber: number;
//   bountyPoints: number;
// }

// TODO: Turn this into a recoil state
const UserCardData: UserCardProps = {
  name: "Ritesh Koushik",
  githubId: "IAmRiteshKoushik",
  currentRank: "0",
  prMergedCount: 10,
  TotalIssues:10,
  InCompleteIssues:10,
  totalBountyPoints: 100,
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
export const STORAGE_KEY = "userCardData";


const getUserData = async (): Promise<boolean> => {
  const { data: session, status } = useSession()
  // TODO: Derive username from session data through useSession hook
  const username = session?.user?.name;
  try {
    const response = await fetch(`api/user?username=${username}`, {
      method: "GET",
    });
    if (response.status !== 200) {
      return false;
    }
    // Deserializing the JSON data to object only if status is 200
    const data = response.json();
    secureLocalStorage.setItem(STORAGE_KEY,data)
    // TODO: Populate the recoil state
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const getUserDataFromStorage = (): UserCardProps | null => {
  const storedData = secureLocalStorage.getItem(STORAGE_KEY);
  try {
    return storedData ? (JSON.parse(storedData as string) as UserCardProps) : null;
  } catch (error) {
    console.error("Error parsing stored user data:", error);
    return null;
  }
};

const UserCard = () => 
  {
  // TODO: Bring in the recoil state which would contain all the necessary data
  const [loading, SetLoading] = useState<boolean>(true);
  const [FetchedUserCardData,setFetchedUserCardData] = useState<UserCardProps | null>(null);
  
  useEffect(() => {
    (async () => {
      const result = await getUserData();
      const storedData = getUserDataFromStorage();
      if (result !== true) 
        {
        SetLoading(true);
        return;
      }
      SetLoading(false);
      setFetchedUserCardData(storedData)
      return;
    })();
  } , []);

  const isDataValid =
  FetchedUserCardData &&
  FetchedUserCardData.githubId &&
  FetchedUserCardData.currentRank &&
  FetchedUserCardData.prMergedCount !== undefined &&
  FetchedUserCardData.totalBountyPoints !== undefined &&
  FetchedUserCardData.name;


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
            <div className="text-8xl text-[#ffcc00] font-bold animate-glow">{FetchedUserCardData.currentRank}</div>
          </div>

          <div className="flex justify-between items-center px-6 pt-8 space-x-6">

            <div className="flex-shrink-0">
              <Image
                src={`https://github.com/${FetchedUserCardData.githubId}.png`}
                alt={`${FetchedUserCardData.githubId} profile`}
                width={128}
                height={128}
                className="rounded-lg border-2"
              />
            </div>


            <div className="text-center">
              <h2 className="text-3xl text-[#6ee7b7] font-semibold">{FetchedUserCardData.name}</h2>
              <p className="text-lg text-right text-gray-300">@{FetchedUserCardData.githubId}</p>
            </div>
          </div>


          <div className="space-y-4 px-6 pt-6">
            <CardDescription className="text-xl text-gray-300">
              🏆 <strong>{FetchedUserCardData.prMergedCount}</strong> pull requests successfully merged!
            </CardDescription>

            <CardDescription className="text-xl text-gray-300">
              🎯 You&apos;ve earned a total of <strong>{FetchedUserCardData.totalBountyPoints}</strong> bounty points from <strong>{FetchedUserCardData.TotalIssues}</strong> completed bounties.
            </CardDescription>

            {/* <CardDescription className="text-xl text-gray-300">
              🔥 You have contributed to <strong>{UserCardData.activeBountyProjects?.length || 0}</strong> active projects:
            </CardDescription> */}
          </div>


          {/* <div className="px-6 space-y-4 py-4">
            {UserCardData.activeBountyProjects && UserCardData.activeBountyProjects.length > 0 ? (
              UserCardData.activeBountyProjects.map((project) => (
                <div key={project.issueNumber} className="bg-[#1d1b2e] p-4 rounded-lg">
                  <h4 className="text-lg text-[#6ee7b7] font-semibold">{project.projectTitle}</h4>
                  <p className="text-sm text-gray-400">Issue #{project.issueNumber}</p>
                  <p className="text-sm text-gray-400">💰 {project.bountyPoints} Bounty Points</p>
                </div>
              ))
            ) : (
              <div className="bg-[#1d1b2e] p-4 rounded-lg">
                <p className="text-sm text-gray-400">You have no active bounty projects at the moment.</p>
              </div>
            )}
          </div> */}
        </Card>
      </BackgroundGradient>
    </div>
  );
};

export default UserCard;