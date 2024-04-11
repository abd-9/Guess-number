import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "./type";

interface PlayerState {
  list: Player[];
}

const initialState: PlayerState = {
  list: [],
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.list.push(action.payload);
    },
    updatePlayerPoints: (
      state,
      action: PayloadAction<{ playerId: string; points: number }>,
    ) => {
      const { playerId, points } = action.payload;
      const player = state.list.find((player) => player.id === playerId);
      if (player) {
        player.points = points;
      }
    },
  },
});

export const { addPlayer, updatePlayerPoints } = playerSlice.actions;

export default playerSlice.reducer;
