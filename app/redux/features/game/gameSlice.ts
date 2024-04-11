import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IRound, Player, PlayerRound, RoundStatus } from "./type";
import { random } from "lodash";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser, updateUserPoints } from "../auth";
import { RootState, store } from "../../store";
import autReducer from "../auth";

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
  currentRound: { id: 0, multiplier: 0, players: [], status: "Ready" },
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
        status: "Ready",
      };
      state.currentRound = newRound;
      state.rounds.push(newRound);
    },

    joinRound(state, action: PayloadAction<PlayerRound>) {
      const selecetedPlayer = state.currentRound.players.find(
        (_p) => _p.id == action.payload.id,
      );
      if (selecetedPlayer) {
        selecetedPlayer.placedPoint = action.payload.placedPoint;
        selecetedPlayer.multiplier = action.payload.multiplier;
      } else {
        state.currentRound.players.push(action.payload);
      }
    },
    updateRoundStatus(state, action: PayloadAction<RoundStatus>) {
      state.currentRound.status = action.payload;
    },

    joinGame(state, action: PayloadAction<Player>) {
      const selecetedPlayer = state.players.find(
        (_p) => _p.id == action.payload.id,
      );
      if (selecetedPlayer) {
      } else {
        state.players.push(action.payload);
      }
    },
    updatePlayerList(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
    updateRound(state, action: PayloadAction<IRound>) {
      //calc player points
      state.currentRound = action.payload;
      state.currentRound.status = "Done";
    },

    setPlayerGuessValue(
      state,
      action: PayloadAction<{
        palyerId: string;
        multipier?: number;
        placedValue?: number;
      }>,
    ) {
      const _player = state.currentRound.players.find(
        (player) => (player.id = action.payload.palyerId),
      );

      if (_player && action.payload?.multipier) {
        _player.multiplier = action.payload.multipier;
      }
      if (_player && action.payload?.placedValue)
        _player.placedPoint = action.payload?.placedValue;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
  },
});

export const selectPlayers = (state: RootState) => state.gameReducer.players;

// Exporting createSelector with selectPlayers selector
export const selectPlayerInGameById = createSelector(
  [selectPlayers, (state: RootState, playerId: string) => playerId],
  (players, playerId) => players.find((player) => player.id === playerId),
);

export const {
  setSpeed,
  setPlayerGuessValue,
  updateRound,
  startRound,
  joinRound,
  joinGame,
  updateRoundStatus,
  updatePlayerList,
} = gameSlice.actions;

export default gameSlice.reducer;

export const endRound = () => (dispatch: any, getState: () => RootState) => {
  const state = getState();
  // state.gameReducer.currentRound.players

  const getCurrentPlayer = state.gameReducer.currentRound.players.find(
    (_p) => _p.id == state.userReducer.currentUser.id,
  );

  let currentRoundPlayers = [...state.gameReducer.currentRound.players];
  const roundMultiplier = state.gameReducer.currentRound.multiplier;
  const roundPlayersPlacedPoint = state.gameReducer.currentRound.players.reduce(
    (totalPoints, player) => totalPoints + player.placedPoint,
    0,
  );
  let gamePlayers = [...state.gameReducer.players];

  currentRoundPlayers.forEach((player, index) => {
    let win = false;
    let newValue = { ...currentRoundPlayers[index] };

    if (currentRoundPlayers[index].multiplier === roundMultiplier) {
      win = true;
      newValue.points =
        (roundPlayersPlacedPoint / roundMultiplier) * newValue.placedPoint;
    } else {
      newValue.points = 0; // Incorrect guess, reset points
    }
    currentRoundPlayers[index] = newValue;

    // updateing the game palyers scores
    const palayerIndex = gamePlayers.findIndex((_p) => _p.id == player.id);
    console.log(
      "gamePlayers[palayerIndex]",
      newValue,
      palayerIndex,
      gamePlayers[palayerIndex],
      win,
      player.placedPoint,
    );

    if (palayerIndex >= 0) {
      const newValue = { ...gamePlayers[palayerIndex] };

      if (win) {
        newValue.points += player.points;
      } else {
        newValue.points -= player.placedPoint;
      }
      gamePlayers[palayerIndex] = newValue;
    }
  });

  dispatch(updatePlayerList(gamePlayers));
  const currentPalyerPoints = gamePlayers.find(
    (_p) => _p.id == state.userReducer.currentUser.id,
  );
  dispatch(updateRound(state.gameReducer.currentRound));

  dispatch(updateUserPoints(currentPalyerPoints?.points!!));
};
