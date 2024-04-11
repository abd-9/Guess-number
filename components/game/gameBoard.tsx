"use client";

import { useAppSelector } from "@/app/redux/hooks";
import ActiveRoundSection from "./(round board)";
import LoginSection from "./login";
import { useMemo } from "react";

export const GameBoard = () => {
  const isLoggedIn = useAppSelector(
    (state) => state.userReducer.currentUser.isLoggedIn,
  );

  return useMemo(
    () => (isLoggedIn ? <ActiveRoundSection /> : <LoginSection />),
    [isLoggedIn],
  );
};
