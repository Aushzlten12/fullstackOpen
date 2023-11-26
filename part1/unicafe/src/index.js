import React, { useState } from "react";
import ReactDOM from "react-dom";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statics = ({ good, neutral, bad }) => {
  const totalReviews = good + neutral + bad;
  const averageReviews = totalReviews === 0 ? 0 : (good - bad) / totalReviews;
  const positivePercentage =
    totalReviews === 0 ? 0 : (good * 100) / totalReviews;
  if (totalReviews > 0) {
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {totalReviews}</p>
        <p>average {averageReviews}</p>
        <p>positive {positivePercentage}%</p>
      </div>
    );
  } else {
    return (
      <p>No feedback given</p>
    )
  }
};
// Statics component has been created

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text={"Good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
      <Title text={"statics"} />
      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
