"use client";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Projects from "./projects";
import Rowcards from "./rowcards";
import { ScrollArea } from "@/app/components/ui/scroll-area";

const rowcardsData = [
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Alice Smith",
    PRmerged: 15,
    earnedBounties: 250,
    github_id: "alice_smith",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Bob Johnson",
    PRmerged: 22,
    earnedBounties: 350,
    github_id: "bob_johnson",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Charlie Brown",
    PRmerged: 10,
    earnedBounties: 180,
    github_id: "charlie_brown",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "David Wilson",
    PRmerged: 8,
    earnedBounties: 150,
    github_id: "david_wilson",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Eva White",
    PRmerged: 30,
    earnedBounties: 500,
    github_id: "eva_white",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Frank Harris",
    PRmerged: 12,
    earnedBounties: 200,
    github_id: "frank_harris",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Grace Lee",
    PRmerged: 18,
    earnedBounties: 270,
    github_id: "grace_lee",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Hannah Martin",
    PRmerged: 25,
    earnedBounties: 400,
    github_id: "hannah_martin",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Ian Thompson",
    PRmerged: 20,
    earnedBounties: 320,
    github_id: "ian_thompson",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Jackie Brown",
    PRmerged: 17,
    earnedBounties: 290,
    github_id: "jackie_brown",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Kevin Davis",
    PRmerged: 14,
    earnedBounties: 220,
    github_id: "kevin_davis",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Laura Wilson",
    PRmerged: 19,
    earnedBounties: 310,
    github_id: "laura_wilson",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Michael Scott",
    PRmerged: 23,
    earnedBounties: 370,
    github_id: "michael_scott",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Nina Patel",
    PRmerged: 16,
    earnedBounties: 260,
    github_id: "nina_patel",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Oscar Martinez",
    PRmerged: 21,
    earnedBounties: 340,
    github_id: "oscar_martinez",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Pam Beesly",
    PRmerged: 13,
    earnedBounties: 210,
    github_id: "pam_beesly",
  },
  {
    avatar_url: "https://github.com/KiranRajeev-KV.png",
    name: "Quincy Adams",
    PRmerged: 11,
    earnedBounties: 190,
    github_id: "quincy_adams",
  },
];

const Leaderboard = () => {
  return (
    <Card className="bg-transparent border-none p-6 relative min-h-screen rounded-none z-50">
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#1d1e3a] text-base text-white h-10 w-full">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <CardHeader className="font-bold text-6xl pt-4 pb-2 px-4 text-[#3abef9]">
            Leaderboard
          </CardHeader>
          <CardDescription className="px-4 pb-4 text-[#c8c7cc]">
            Leaderboard refreshes every 1 hour.
          </CardDescription>

          <div className="flex bg-[#1d1b2e] mx-4 p-4 text-white font-semibold rounded-lg">
            <div className="w-[10%] text-left">Rank</div>
            <div className="w-[50%] text-left pl-16">Name</div>
            <div className="w-[20%] text-center">PR Merged</div>
            <div className="w-[20%] text-right">Bounties</div>
          </div>

          <ScrollArea className="max-h-[75vh] overflow-auto relative">
          {rowcardsData.length === 0 ? (
              <div className="text-center text-2xl text-[#c8c7cc] p-4">
                Can&apos;t show leaderboard stats
              </div>
            ) : (
              rowcardsData.map((data, index) => (
                <Rowcards
                  key={index}
                  index={index + 1}
                  avatar_url={data.avatar_url}
                  name={data.name}
                  github_id={data.github_id}
                  PRmerged={data.PRmerged}
                  earnedBounties={data.earnedBounties}
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
