"use client";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Projects from "./projects";
import Rowcards from "./rowcards";
import { ScrollArea } from "@/app/components/ui/scroll-area";

const names = [
  ["Ashwin Narayanan S", "Ashrockzzz2003"],
  ["Abhinav Ramakrishnan", "Abhinav-ark"],
  ["Abineha", "abineha"],
  ["Shreyas Vishveshwaran", "FirefoxSRV"],
  ["Ritesh Koushik", "IAmRiteshKoushik"],
  ["Amritha Nandini KL", "Amri-tah"],
  ["Saran Darshan", "SaranDharshanSP"],
  ["Vishal The Human Vishal The Human", "VishalTheHuman"],
  ["Kiran Rajeev", "KiranRajeev-KV"],
  ["Vijay S B", "vijaysb0613"],
];

const shuffledNames = names.sort(() => 0.5 - Math.random());
function getname(index: number) {
  return shuffledNames[index];
}

const rowcardsData = [
  {
    avatar_url: `https://github.com/${getname(0)[1]}.png`,
    name: getname(0)[0],
    PRmerged: 15,
    earnedBounties: 250,
    github_id: getname(0)[1],
  },
  {
    avatar_url: `https://github.com/${getname(1)[1]}.png`,
    name: getname(1)[0],
    PRmerged: 10,
    earnedBounties: 200,
    github_id: getname(1)[1],
  },
  {
    avatar_url: `https://github.com/${getname(2)[1]}.png`,
    name: getname(2)[0],
    PRmerged: 8,
    earnedBounties: 150,
    github_id: getname(2)[1],
  },
  {
    avatar_url: `https://github.com/${getname(3)[1]}.png`,
    name: getname(3)[0],
    PRmerged: 7,
    earnedBounties: 120,
    github_id: getname(3)[1],
  },
  {
    avatar_url: `https://github.com/${getname(4)[1]}.png`,
    name: getname(4)[0],
    PRmerged: 6,
    earnedBounties: 100,
    github_id: getname(4)[1],
  },
  {
    avatar_url: `https://github.com/${getname(5)[1]}.png`,
    name: getname(5)[0],
    PRmerged: 5,
    earnedBounties: 80,
    github_id: getname(5)[1],
  },
  {
    avatar_url: `https://github.com/${getname(6)[1]}.png`,
    name: getname(6)[0],
    PRmerged: 4,
    earnedBounties: 60,
    github_id: getname(6)[1],
  },
  {
    avatar_url: `https://github.com/${getname(7)[1]}.png`,
    name: getname(7)[0],
    PRmerged: 3,
    earnedBounties: 40,
    github_id: getname(7)[1],
  },
  {
    avatar_url: `https://github.com/${getname(8)[1]}.png`,
    name: getname(8)[0],
    PRmerged: 2,
    earnedBounties: 20,
    github_id: getname(8)[1],
  },
  {
    avatar_url: `https://github.com/${getname(9)[1]}.png`,
    name: getname(9)[0],
    PRmerged: 1,
    earnedBounties: 10,
    github_id: getname(9)[1],
  },
];

const Leaderboard = () => {
  const sortedData = [...rowcardsData].sort(
    (a, b) => b.earnedBounties - a.earnedBounties
  );
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
            <div className="text-sm sm:text-base w-[70%] text-left pl-16 sm:w-[50%]">
              Name
            </div>
            <div className="text-sm sm:text-base w-[20%] text-center hidden sm:block">
              PR Merged
            </div>
            <div className="text-sm sm:text-base w-[20%] text-right">
              Bounties
            </div>
          </div>

          <ScrollArea className="max-h-[75vh] overflow-auto relative">
            {rowcardsData.length === 0 ? (
              <div className="text-center text-2xl text-[#c8c7cc] p-4">
                Can&apos;t show leaderboard stats
              </div>
            ) : (
              sortedData.map((data, index) => (
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
