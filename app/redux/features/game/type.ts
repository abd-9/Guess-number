import { User } from "../auth";
export type RoundStatus = "Ready" | "Done";

export interface Player extends User {
  placedPoint: number;
}
export interface PlayerRound extends Player, User {
  multiplier: number; // guessed mutiplier
}
export interface IRound {
  id: number;
  multiplier: number;
  players: PlayerRound[];
  status: RoundStatus;
}
