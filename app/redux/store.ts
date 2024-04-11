import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import gameReducer from "./features/game/gameSlice";
import chatReducer from "./features/game/chatSlice";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    counterReducer,
    chatReducer,
    gameReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// const count = useAppSelector((state) => state.counterReducer.value);
// const dispatch = useAppDispatch();
