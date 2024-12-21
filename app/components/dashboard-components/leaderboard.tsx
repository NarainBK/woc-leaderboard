"use client";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Projects from "./projects";
import Rowcards from "./rowcards";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./usercard";

const Leaderboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  const getLeaderboardData = async (): Promise<any[]> => {
    try {
      const request = await fetch("/api/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.status !== 200) {
        console.log("Error fetching leaderboard data", request.status);
        return [];
      }

      const data = await request.json();
      return Array.isArray(data.leaderboard) ? data.leaderboard : [];
    } catch (error) {
      console.log("Error fetching leaderboard data", error);
      return [];
    }
  };

  const saveUserRankToStorage = (username: string, rank: number) => {
    try {
      const storedData = secureLocalStorage.getItem(STORAGE_KEY);
      if (storedData && typeof storedData === 'string') { // Ensure it's a string
        const parsedData = JSON.parse(storedData);
        parsedData.rank = rank;
        secureLocalStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      }
    } catch (error) {
      console.error("Error saving rank to storage:", error);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
  
      data.forEach((userData, index) => {
        const rank = index + 1;
        saveUserRankToStorage(userData.username, rank);
      });
  
      // Check if the rank is stored in localStorage after updating
      const storedData = secureLocalStorage.getItem(STORAGE_KEY);
      console.log("Stored data in localStorage:", storedData); // Log to check the stored data
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);
  

  return (
    <Card className="bg-transparent border-none p-6 relative rounded-none z-50 w-full max-h-screen overflow-y-auto">
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#1d1e3a] text-base text-white h-10 w-full">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <CardHeader className="font-bold text-4xl sm:text-6xl pt-4 pb-2 px-4 text-[#3abef9]">
            Leaderboard
          </CardHeader>
          <CardDescription className="px-4 pb-4 text-[#c8c7cc]">
            Leaderboard refreshes every 1 hour.
          </CardDescription>

          <div className="flex bg-[#1d1b2e] mx-2 p-4 text-white sm:font-semibold rounded-lg">
            <div className="text-sm sm:text-base w-[10%] text-left">Rank</div>
            <div className="text-sm sm:text-base w-[70%] text-left pl-16">
              Name
            </div>
            <div className="text-sm sm:text-base w-[20%] text-center hidden md:block">
              PR Merged
            </div>
            <div className="text-sm sm:text-base w-[20%] text-right">
              Bounties
            </div>
          </div>

          <ScrollArea className="max-h-[75vh] overflow-y-auto overflow-x-auto relative">
            {loading ? (
              <div className="text-center text-2xl text-[#c8c7cc] p-4">
                Loading leaderboard data...
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className="text-center text-2xl text-[#c8c7cc] p-4">
                Can't show leaderboard stats
              </div>
            ) : (
              leaderboardData.map((data, index) => (
                <Rowcards
                  key={index}
                  index={index + 1}
                  avatar_url={`https://github.com/${data.username}.png`}
                  fullName={data.fullName}
                  username={data.username}
                  PRmerged={data.Solution.length}
                  bounty={data.bounty}
                />
              ))
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="projects">
          <Projects />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Leaderboard;
