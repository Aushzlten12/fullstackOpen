import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  badIncremented,
  goodIncremented,
  okIncremented,
  resetstats,
} from "./store/slice";

const App = () => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats.stats);

  return (
    <>
      <div className="app">
        <div className="content">
          <button onClick={() => dispatch(goodIncremented())}>
            <span>Good</span>
          </button>
          <button onClick={() => dispatch(okIncremented())}>
            <span>Ok</span>
          </button>
          <button onClick={() => dispatch(badIncremented())}>
            <span>bad</span>
          </button>
          <button onClick={() => dispatch(resetstats())}>
            <span>reset stats</span>
          </button>
        </div>
        <div className="main">
          <h2>
            Good
            <span>{stats.good}</span>
          </h2>
          <h2>
            Ok
            <span>{stats.ok}</span>
          </h2>
          <h2>
            Bad
            <span>{stats.bad}</span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default App;
