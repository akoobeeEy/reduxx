import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/Slice";
export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
