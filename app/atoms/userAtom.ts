import { atom } from "recoil";
export interface UserCardProps {
  name: string;                     
  githubId: string;                
  currentRank: string;             
  prMergedCount: number;
  totalBountyPoints: number;        
  totalIssues: number;              
  incompleteIssues: number; 
}
export const LeaderBoardState = atom<UserCardProps | null>({
  key: "userState", 
  default: null,    
});
