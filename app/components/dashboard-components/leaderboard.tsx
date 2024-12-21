"use client";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Projects from "./projects";
import Rowcards from "./rowcards";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./usercard";
// const names = [
//   ["Ashwin Narayanan S", "Ashrockzzz2003"],
//   ["Abhinav Ramakrishnan", "Abhinav-ark"],
//   ["Abineha", "abineha"],
//   ["Shreyas Vishveshwaran", "FirefoxSRV"],
//   ["Ritesh Koushik", "IAmRiteshKoushik"],
//   ["Amritha Nandini KL", "Amri-tah"],
//   ["Saran Darshan", "SaranDharshanSP"],
//   ["Vishal The Human", "VishalTheHuman"],
//   ["Kiran Rajeev", "KiranRajeev-KV"],
//   ["Vijay S B", "vijaysb0613"],
// ];

// const shuffledNames = names.sort(() => 0.5 - Math.random());
// function getname(index: number) {
//   return shuffledNames[index];
// }

// const rowcardsData = [
//   {
//     avatar_url: `https://github.com/${getname(0)[1]}.png`,
//     name: getname(0)[0],
//     PRmerged: 15,
//     bounty: 250,
//     username: getname(0)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(1)[1]}.png`,
//     name: getname(1)[0],
//     PRmerged: 10,
//     bounty: 200,
//     username: getname(1)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(2)[1]}.png`,
//     name: getname(2)[0],
//     PRmerged: 8,
//     bounty: 150,
//     username: getname(2)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(3)[1]}.png`,
//     name: getname(3)[0],
//     PRmerged: 7,
//     bounty: 120,
//     username: getname(3)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(4)[1]}.png`,
//     name: getname(4)[0],
//     PRmerged: 6,
//     bounty: 100,
//     username: getname(4)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(5)[1]}.png`,
//     name: getname(5)[0],
//     PRmerged: 5,
//     bounty: 80,
//     username: getname(5)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(6)[1]}.png`,
//     name: getname(6)[0],
//     PRmerged: 4,
//     bounty: 60,
//     username: getname(6)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(7)[1]}.png`,
//     name: getname(7)[0],
//     PRmerged: 3,
//     bounty: 40,
//     username: getname(7)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(8)[1]}.png`,
//     name: getname(8)[0],
//     PRmerged: 2,
//     bounty: 20,
//     username: getname(8)[1],
//   },
//   {
//     avatar_url: `https://github.com/${getname(9)[1]}.png`,
//     name: getname(9)[0],
//     PRmerged: 1,
//     bounty: 10,
//     username: getname(9)[1],
//   },
// ];

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
      // console.log("Fetched leaderboard data:", data); // Log the response
  
      // Ensure you're accessing the correct data inside the "leaderboard" key
      return Array.isArray(data.leaderboard) ? data.leaderboard : [];
    } catch (error) {
      console.log("Error fetching leaderboard data", error);
      return [];
    }
  };
  const saveIndexesToStorage = (data: any[]) => {
    data.forEach((user, index) => {
      // Store the index in secureLocalStorage with the username as the key
      secureLocalStorage.setItem(user.username, index);
    });
    console.log("Indexes saved to storage");
  };

  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
      saveIndexesToStorage(data); 
      setLoading(false);
      // console.log("Leaderboard Data after fetch:", data); 
    };
    fetchLeaderboard();
  }, []);

  // const sortedData = leaderboardData.sort(
  //   (a, b) => b.bounty - a.bounty
  // );


 
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
