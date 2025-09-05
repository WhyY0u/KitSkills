import type { User } from "../user/User";

export interface Result {
  user: User;
  time: string;
  score: number;
}

export interface Skill {
  name: string;
  id: string;
  description: string;
  topResult: Result[]
}
