import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export { store };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
