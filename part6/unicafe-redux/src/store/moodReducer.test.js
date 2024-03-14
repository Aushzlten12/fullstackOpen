import deepFreeze from "deep-freeze";
import statReducer, {
  badIncremented,
  goodIncremented,
  okIncremented,
  resetstats,
} from "./slice";

describe("unicafe reducer", () => {
  const initialState = {
    stats: {
      good: 0,
      ok: 0,
      bad: 0,
    },
  };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = statReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = statReducer(state, goodIncremented());
    expect(newState).toEqual({
      stats: {
        good: 1,
        ok: 0,
        bad: 0,
      },
    });
  });

  test("bad is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = statReducer(state, badIncremented());
    expect(newState).toEqual({
      stats: {
        good: 0,
        ok: 0,
        bad: 1,
      },
    });
  });

  test("ok is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = statReducer(state, okIncremented());
    expect(newState).toEqual({
      stats: {
        good: 0,
        ok: 1,
        bad: 0,
      },
    });
  });

  test("reset stats", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = statReducer(state, resetstats());
    expect(newState).toEqual({
      stats: {
        good: 0,
        ok: 0,
        bad: 0,
      },
    });
  });
});
