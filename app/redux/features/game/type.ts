export interface Player {
  id: string;
  name: string;
  points: number;
}
export interface PlayerRound extends Player {
  multiplier: number; // guessed mutiplier
}
export interface IRound {
  id: number;
  multiplier: number;
  players: PlayerRound[];
}
