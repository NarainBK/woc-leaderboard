"use client";
import { CardHeader, CardDescription } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import ProjectCard from "./projectcard";

const ProjectData = [
  {
    name: "Project 1",
    projectUrl: "https://www.google.com",
    blurb: "A project for beginners. Learn the basics of web development.",
    techstack: ["html", "javascript"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 2",
    projectUrl: "https://www.google.com",
    blurb:
      "A project for intermediate developers. Build a full-stack application.",
    techstack: ["React", "Nodejs"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 3",
    projectUrl: "https://www.google.com",
    blurb:
      "A project for advanced developers. Work with TypeScript and databases.",
    techstack: ["TypeScript", "PostgreSQL"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 4",
    projectUrl: "https://www.google.com",
    blurb: "A project for all levels. Develop with Python and Django.",
    techstack: ["Python", "Django", "PostgreSQL"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 5",
    projectUrl: "https://www.google.com",
    blurb: "A project for mobile developers. Create a cross-platform app.",
    techstack: ["React Native", "Expo"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 6",
    projectUrl: "https://www.google.com",
    blurb: "A project for data scientists. Analyze data with Python.",
    techstack: ["Python", "Pandas", "NumPy"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 7",
    projectUrl: "https://www.google.com",
    blurb: "A project for game developers. Build a game with Unity.",
    techstack: ["C#", "Unity"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 8",
    projectUrl: "https://www.google.com",
    blurb: "A project for AI enthusiasts. Create a chatbot with NLP.",
    techstack: ["Python", "TensorFlow"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 9",
    projectUrl: "https://www.google.com",
    blurb: "A project for blockchain developers. Develop a DApp.",
    techstack: ["Solidity", "Ethereum"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
  },
  {
    name: "Project 10",
    projectUrl: "https://www.google.com",
    blurb: "A project for DevOps engineers. Set up CI/CD pipelines.",
    techstack: ["Docker", "Kubernetes"],
    maintainer: ["IAmRiteshKoushik", "IAmRiteshKoushik"],
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
