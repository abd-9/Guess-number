import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRound, Player } from "./type";
import { random } from "lodash";

interface GameState {
  roomId: string;
  speed: number;
  players: Player[];
  currentRound: IRound;
  rounds: IRound[];
}

const initialState: GameState = {
  roomId: "new",
  speed: 1,
  players: [],
  currentRound: { id: 0, multiplier: 0, players: [] },
  rounds: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startRound(state) {
      const newRound: IRound = {
        id: state.currentRound.id + 1,
        multiplier: Number(random(0, 10, true).toFixed(2)),
        players: [],
      };
      state.currentRound = newRound;

      state.rounds.push(newRound);
    },

    endRound(state) {
      //calc player points
      const currentRoundPlayers = [...state.currentRound.players];
      const roundMultiplier = state.currentRound.multiplier;
      const roundPlayersPlacedPoint = state.currentRound.players.reduce(
        (totalPoints, player) => totalPoints + player.points,
        0,
      );
      currentRoundPlayers.forEach((player) => {
        let win = false;
        if (player.multiplier === roundMultiplier) {
          win = true;
          player.points =
            (roundPlayersPlacedPoint / roundMultiplier) * player.points;
        } else {
          player.points = 0; // Incorrect guess, reset points
        }

        // updateing the game palyers scores
        const palayerIndex = gamePlayers.findIndex((_p) => _p.id == player.id);
        if (palayerIndex > 0) {
          if (win) gamePlayers[palayerIndex].points += player.points;
          else gamePlayers[palayerIndex].points -= player.points;
        }
      });

      // updating player score for the game
      const gamePlayers = [...state.players];
    },

    setPlayerGuessValue(
      state,
      action: PayloadAction<{
        palyerId: string;
        multipier: number;
        placedValue: number;
      }>,
    ) {
      const _player = state.currentRound.players.find(
        (player) => (player.id = action.payload.palyerId),
      );

      if (_player) {
        _player.multiplier = action.payload.multipier;
        _player.points = action.payload.placedValue;
      }
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
  },
});

export const { setSpeed, setPlayerGuessValue, endRound, startRound } =
  gameSlice.actions;

export default gameSlice.reducer;
