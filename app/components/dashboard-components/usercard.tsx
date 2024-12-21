"use client";
import Image from "next/image";
import { Card, CardDescription } from "../ui/card";
import { Spotlight } from "../ui/spotlight";
import { BackgroundGradient } from "../ui/background-gradient";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import useLeaderboardStore from "@/app/useLeaderboardStore";
import { useSession } from "next-auth/react";

export const STORAGE_KEY = "leaderboardData";

interface UserCardProps {
  fullname: string;
  rollNumber: string;
  username: string;
  issues: { issueStatus: boolean; url: string }[];
  issueCount: number;
  bounty: number;
}
const getRankFromStorage = (): number | null => {
  try {
    console.log("Retrieving rank from storage...");
    const storedData = secureLocalStorage.getItem(STORAGE_KEY);
    console.log("Stored data:", storedData);
    const parsedData = storedData ? JSON.parse(storedData as string) : null;

    if (parsedData && parsedData.rank !== undefined) {
      return parsedData.rank;
    }
    return null;
  } catch (error) {
    console.error("Error parsing stored rank data:", error);
    return null;
  }
};

// const getLeaderboardFromStorage = (): UserCardProps | null => {
//   try {
//     console.log("Retrieving user data from storage...");
//     const storedData = secureLocalStorage.getItem(STORAGE_KEY);
//     console.log("Stored data:", storedData);
//     return storedData ? (JSON.parse(storedData as string) as UserCardProps) : null;
//   } catch (error) {
//     console.error("Error parsing stored user data:", error);
//     return null;
//   }
// };

const UserCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserCardProps | null>(null);
  const [rank, setRank] = useState<number | null>();
  const { data: session, status } = useSession()
  const getUserData = async () => {
    if (!session || !session.user) {
      return
    }
    const username = session.user.name;
    console.log("username "+username)
    try {
      console.log("Fetching user data...");
      const response = await fetch(`api/user?username=${username}`, {
        method: "GET",
      });
      console.log("Response status:", response.status);
      if (response.status !== 200) {
        console.error("Failed to fetch data. Status code:", response.status);
        return false;
      }
      const data = await response.json();
      // const UserName=data.username
      setUserData(data);
      console.log("Fetched data:", data);
      // secureLocalStorage.setItem("username",UserName)
      return true;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        console.log("Initializing data fetching...");
        getUserData();
        console.log("Fetched user data from storage:", userData);

        // Log the rank from local storage
        

        console.log("setting rank");
        console.log(rank)
        // setRank(parseInt(rank as string));
        // setTimeout(()=> {},1000);
        console.log("User's rank from local storage:", rank);

        if (userData) {
          console.log("Setting user data:", userData);
          setUserData(userData);
        } else {
          console.log("Failed to fetch data or user data is empty.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during useEffect:", error);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="mx-4">
        <BackgroundGradient className="py-4">
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="px-6 pt-6 text-center text-gray-300">
              <h2 className="text-2xl text-[#c8c7cc] font-semibold">
                Loading user data...
              </h2>
            </div>
          </Card>
        </BackgroundGradient>
      </div>
    );
  }

  if (!userData) {
    console.log("User data is null.");
    return (
      <div className="mx-4">
        <BackgroundGradient className="py-4">
          <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
            <div className="px-6 pt-6 text-center text-gray-300">
              <h2 className="text-2xl text-[#c8c7cc] font-semibold">
                Fetching Your Data
              </h2>
              <p>Please wait for a while 😊</p>
            </div>
          </Card>
        </BackgroundGradient>
      </div>
    );
  }

  console.log("Rendering UserCard with userData:", userData);

  return (
    <div className="mx-4">
      <BackgroundGradient className="py-4">
        <Spotlight fill="blue" />
        <Card className="bg-[#050217] border-1 pb-6 relative rounded-xl shadow-lg mx-4">
          <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
            <div className="text-8xl text-[#ffcc00] font-bold animate-glow">
             {useLeaderboardStore.getState().getRank(userData.username)}
            </div>
          </div>
          <div className="flex justify-between items-center px-6 pt-8 space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={`https://github.com/${userData.username}.png`}
                alt={`${userData.username} profile`}
                width={128}
                height={128}
                className="rounded-lg border-2"
                onError={() =>
                  console.error("Error loading GitHub profile image.")
                }
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl text-[#6ee7b7] font-semibold">
                {userData.fullname}
              </h2>
              <p className="text-lg text-center text-gray-300">
                @{userData.username}
              </p>
              <p className="text-gray-400 text-sm">
                Roll No: {userData.rollNumber}
              </p>
            </div>
          </div>

          <div className="space-y-4 px-6 pt-6">
            <CardDescription className="text-xl text-gray-300">
              🎯 Total Completed Issues: <strong>{userData.issueCount}</strong>
            </CardDescription>
            <CardDescription className="text-xl text-gray-300">
              🏆 Total Bounty Earned: <strong>{userData.bounty}</strong>
            </CardDescription>

            <div className="text-gray-300">
              <h3 className="text-lg font-semibold">Incomplete Issues:</h3>
              {userData.issues.length > 0 ? (
                <ul className="list-disc list-inside">
                  {userData.issues
                    .filter((issue) => !issue.issueStatus)
                    .map((issue, index) => (
                      <li key={index}>
                        <a
                          href={issue.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {issue.url}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No incomplete issues found.</p>
              )}
            </div>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  );
};

export default UserCard;

