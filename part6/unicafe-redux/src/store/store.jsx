import { configureStore } from "@reduxjs/toolkit";
import statReducer from "./slice";

const store = configureStore({
  reducer: { stats: statReducer },
});

export default store;
