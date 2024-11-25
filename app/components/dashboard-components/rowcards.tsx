  "use client";
  import Image from "next/image";
  import { Card } from "../ui/card";
  import { GitPullRequest } from "lucide-react";

export interface RowcardsProps {
    index: number;
    avatar_url?: string;
    name: string;
    github_id: string;
    PRmerged: number;
    earnedBounties: number;
  }

  const Rowcards = (props: RowcardsProps) => {
    return (
      <Card className="flex items-center p-4 mx-4 my-3 border-none h-[5.5rem] bg-cover" style={{ backgroundImage: "url('cardBackground.png')" }}>
        <div className="flex items-center w-full">
          <p className="text-lg text-[#f2f2f3] font-semibold pl-2 w-[10%]">
            {props.index}
          </p>

          <div className="w-[50%] flex items-center">
            <Image
              src={props.avatar_url || "/default-avatar.png"}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full md:w-12 md:h-12 "
            />
            <div className="flex flex-col items-start pl-4">
              <p className="text-lg text-[#f2f2f3] md:text-2xl">{props.name}</p>
              <p className="text-sm text-gray-200">@{props.github_id}</p>
            </div>
          </div>

          <div className="flex w-[20%] items-center justify-center">
            <GitPullRequest
              className="bg-slate-600 rounded-full w-6 h-6 p-1"
              color="rgb(94 234 212)"
            />
            <p className="text-[#f2f2f3] font-semibold text-base pl-2">
              {props.PRmerged}
            </p>
          </div>

          <div className="w-[20%] flex items-center justify-end md:w-[20%]">
            <p className="text-2xl font-bold text-[#FFD700]">
              {props.earnedBounties}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  export default Rowcards;
