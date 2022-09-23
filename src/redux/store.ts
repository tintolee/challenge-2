import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { covidNigeriaReducer } from "./covidNigeriaSlice";

export const store = configureStore({
  reducer: {
    covidNigeria: covidNigeriaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
