"use client";
import { CardHeader, CardDescription } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import ProjectCard from "./projectcard";

const ProjectData = [
  {
    name: "Quick Start Express",
    projectUrl: "https://github.com/CSE-25/quick_start_express",
    blurb: "A project for beginners. Learn the basics of web development.",
    techstack: ["html", "javascript"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Amrita PYQ",
    projectUrl: "https://github.com/CSE-25/amrita_pyq",
    blurb:
      "A project for intermediate developers. Build a full-stack application.",
    techstack: ["React", "Nodejs"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Amrita Map",
    projectUrl: "https://github.com/Abhinav-ark/Amrita_map",
    blurb:
      "A project for advanced developers. Work with TypeScript and databases.",
    techstack: ["TypeScript", "PostgreSQL"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Match da pairs",
    projectUrl: "https://github.com/FirefoxSRV/Match-da-pairs",
    blurb: "A project for all levels. Develop with Python and Django.",
    techstack: ["Python", "Django", "PostgreSQL"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Google Maps SDK for Android",
    projectUrl: "https://github.com/Ashrockzzz2003/google_maps_kotlin_android/",
    blurb: "A project for mobile developers. Create a cross-platform app.",
    techstack: ["React Native", "Expo"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Amrita Placement Tracker - Web",
    projectUrl: "https://github.com/Ashrockzzz2003/placement_tracker_web/",
    blurb: "A project for data scientists. Analyze data with Python.",
    techstack: ["Python", "Pandas", "NumPy"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Server for Amrita Placement Tracker",
    projectUrl: "https://github.com/Ashrockzzz2003/placement_tracker_server/",
    blurb: "A project for game developers. Build a game with Unity.",
    techstack: ["C#", "Unity"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Data Structures And Algorithms",
    projectUrl:
      "https://github.com/Ashrockzzz2003/Data_Structures_and_Algorithms/",
    blurb: "A project for AI enthusiasts. Create a chatbot with NLP.",
    techstack: ["Python", "TensorFlow"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Bluedis",
    projectUrl: "https://github.com/IAmRiteshKoushik/bluedis",
    blurb: "A project for blockchain developers. Develop a DApp.",
    techstack: ["Solidity", "Ethereum"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Timetable B.Tech CSE A Progressive Web App",
    projectUrl: "https://github.com/Abhinav-ark/timetable_csea",
    blurb: "A project for DevOps engineers. Set up CI/CD pipelines.",
    techstack: ["Docker", "Kubernetes"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "BurntBrotta",
    projectUrl: "https://github.com/amri-tah/burntbrotta.github.io",
    blurb: "A project for all levels. Develop with Python and Django.",
    techstack: ["Python", "Django", "PostgreSQL"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "LeetPath",
    projectUrl: "https://github.com/amri-tah/LeetPath",
    blurb: "A project for competitive programmers. Practice coding problems.",
    techstack: ["JavaScript", "React"],
    maintainer: ["amri-tah"],
  },
  {
    name: "BurntBrotta Flutter",
    projectUrl: "https://github.com/amri-tah/BurntBrotta-Flutter",
    blurb: "A project for mobile developers. Create a Flutter application.",
    techstack: ["Flutter", "Dart"],
    maintainer: ["amri-tah"],
  },
  {
    name: "AmritaGPT",
    projectUrl: "https://github.com/SaranDharshanSP/AmritaGPT",
    blurb: "A project for AI enthusiasts. Develop a GPT-based chatbot.",
    techstack: ["Python", "TensorFlow"],
    maintainer: ["SaranDharshanSP"],
  },
  {
    name: "NeuroScribe",
    projectUrl: "https://github.com/SaranDharshanSP/NeuroScribe",
    blurb: "A project for healthcare tech. Build a medical transcription tool.",
    techstack: ["Python", "NLP"],
    maintainer: ["SaranDharshanSP"],
  },
  {
    name: "TN Tourism",
    projectUrl: "https://github.com/SaranDharshanSP/TN-Tourism.github.io",
    blurb: "A project for web developers. Create a tourism website.",
    techstack: ["HTML", "CSS", "JavaScript"],
    maintainer: ["SaranDharshanSP"],
  },
  {
    name: "Amrita Sports Management System",
    projectUrl:
      "https://github.com/SaranDharshanSP/Amrita-Sports-Management-System",
    blurb: "A project for full-stack developers. Manage sports events.",
    techstack: ["Node.js", "React", "MongoDB"],
    maintainer: ["SaranDharshanSP"],
  },
];

const projects = () => {
  return (
    <div>
      <CardHeader className="font-bold text-6xl pt-4 pb-2 px-4 text-[#3abef9]">
        Projects
      </CardHeader>
      <CardDescription className="px-4 pb-2 text-[#c8c7cc]">
        Projects with bounties to work on.
      </CardDescription>
      <ScrollArea className="max-h-[80vh] overflow-auto relative">
        <div className="grid grid-cols-1 gap-4 p-4">
          {ProjectData.length === 0 ? (
            <div className="flex justify-center items-center h-full text-[#c8c7cc] text-2xl">
              No projects available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4">
              {ProjectData.map((project, index) => (
                <ProjectCard
                  key={index}
                  name={project.name}
                  projectUrl={project.projectUrl}
                  blurb={project.blurb}
                  techstack={project.techstack}
                  maintainer={project.maintainer}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default projects;
