import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "./game/type";
import { random } from "lodash";

export interface User {
  id: string;
  name: string;
  roomId: string | null;
  isLoggedIn?: boolean;
  points: number;
}

interface AuthState {
  currentUser: User;
}

const initialState: AuthState = {
  currentUser: {
    name: "",
    isLoggedIn: false,
    id: random().toString(),
    roomId: "",
    points: 1000,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Partial<User>>) {
      // state.currentUser = action.payload;

      state.currentUser = { ...state.currentUser, ...action.payload };
      state.currentUser.isLoggedIn = true;
      state.currentUser.points = 1000;
    },
    logoutUser(state) {
      state.currentUser = initialState.currentUser;
    },

    updateUser(state, action: PayloadAction<User>) {
      if (state.currentUser && state.currentUser.id === action.payload.id) {
        state.currentUser.name = action.payload.name;
        state.currentUser.roomId = action.payload.roomId;
      }
    },
    updateUserPoints(state, action: PayloadAction<number>) {
      if (state.currentUser) state.currentUser.points = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser, updateUserPoints } =
  authSlice.actions;

export default authSlice.reducer;
