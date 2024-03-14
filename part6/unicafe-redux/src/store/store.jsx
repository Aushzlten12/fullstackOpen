import { configureStore } from "@reduxjs/toolkit";
import moodReducer from "./slice";

const store = configureStore({
  reducer: { moods: moodReducer },
});

export default store;
