import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const AnecdoteSelected = ({ anecdotes, selected, votes }) => (
  <div>
    <p>{anecdotes[selected]}</p>
    <p>Votes: {votes[selected]}</p>
  </div>
  
);

const incrementVotes = (votes, indexselect) => {
  votes[indexselect] += 1;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const maxRange = props.anecdotes.length;
  const [votes, setVotes] = useState(new Uint8Array(maxRange));
  const handleVote = () => {
    const newVotes = [... votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
  return (
    <div>
      <AnecdoteSelected anecdotes={props.anecdotes} selected={selected} votes={votes}/>
      <Button handleClick={handleVote} text={"vote"} />
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * maxRange))}
        text={"next anecdote"}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
);
