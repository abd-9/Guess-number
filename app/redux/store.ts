"use client";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import gameReducer from "./features/game/gameSlice";
import chatReducer from "./features/game/chatSlice";
import userReducer from "./features/auth";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// Define a middleware function to save Redux state to local session storage
const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("reduxState", serializedState);
    }
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

// Load Redux state from local session storage
const loadStateFromLocalStorage = () => {
  try {
    return {};
    if (typeof window !== "undefined") {
      const serializedState = sessionStorage.getItem("reduxState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    }
    return {};
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

// Initialize Redux store with initial state from local session storage
const initialState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    counterReducer,
    chatReducer,
    gameReducer,
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware]),
  preloadedState: initialState, // Set preloaded state from local storage
});

// Save Redux state to local session storage on each state change
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
