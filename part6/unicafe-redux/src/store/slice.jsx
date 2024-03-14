import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    good: 0,
    ok: 0,
    bad: 0,
  },
};

export const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    goodIncremented: (state) => {
      return {
        ...state,
        stats: {
          ...state.stats,
          good: state.stats.good + 1,
        },
      };
    },
    okIncremented: (state) => {
      return {
        ...state,
        stats: {
          ...state.stats,
          ok: state.stats.ok + 1,
        },
      };
    },
    badIncremented: (state) => {
      return {
        ...state,
        stats: {
          ...state.stats,
          bad: state.stats.bad + 1,
        },
      };
    },
    resetstats: (state) => {
      return {
        ...state,
        stats: {
          good: 0,
          ok: 0,
          bad: 0,
        },
      };
    },
  },
});

export const { goodIncremented, okIncremented, badIncremented, resetstats } =
  statSlice.actions;

export default statSlice.reducer;
