import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers"; // Import your data reducer

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
