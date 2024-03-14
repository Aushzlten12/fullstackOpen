import deepFreeze from "deep-freeze";
import moodReducer, {
  badIncremented,
  goodIncremented,
  okIncremented,
  resetMoods,
} from "./slice";

describe("unicafe reducer", () => {
  const initialState = {
    moods: {
      good: 0,
      ok: 0,
      bad: 0,
    },
  };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = moodReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = moodReducer(state, goodIncremented());
    expect(newState).toEqual({
      moods: {
        good: 1,
        ok: 0,
        bad: 0,
      },
    });
  });

  test("bad is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = moodReducer(state, badIncremented());
    expect(newState).toEqual({
      moods: {
        good: 0,
        ok: 0,
        bad: 1,
      },
    });
  });

  test("ok is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = moodReducer(state, okIncremented());
    expect(newState).toEqual({
      moods: {
        good: 0,
        ok: 1,
        bad: 0,
      },
    });
  });

  test("reset stats", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = moodReducer(state, resetMoods());
    expect(newState).toEqual({
      moods: {
        good: 0,
        ok: 0,
        bad: 0,
      },
    });
  });
});
