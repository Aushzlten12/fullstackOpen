import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moods: {
    good: 0,
    ok: 0,
    bad: 0,
  },
};

export const moodSlice = createSlice({
  name: "moods",
  initialState,
  reducers: {
    goodIncremented: (state) => {
      return {
        ...state,
        moods: {
          ...state.moods,
          good: state.moods.good + 1,
        },
      };
    },
    okIncremented: (state) => {
      return {
        ...state,
        moods: {
          ...state.moods,
          ok: state.moods.ok + 1,
        },
      };
    },
    badIncremented: (state) => {
      return {
        ...state,
        moods: {
          ...state.moods,
          bad: state.moods.bad + 1,
        },
      };
    },
    resetMoods: (state) => {
      return {
        ...state,
        moods: {
          good: 0,
          ok: 0,
          bad: 0,
        },
      };
    },
  },
});

export const { goodIncremented, okIncremented, badIncremented, resetMoods } =
  moodSlice.actions;

export default moodSlice.reducer;
