import React from "react";

// Ыузфкфеу Statistics component

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / (good + neutral + bad)) * 100 || 0;
  const positive = (good / (good + neutral + bad)) * 100 || 0;

  return (
    <>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Average {average}</p>
      <p>Positive {positive}%</p>
    </>
  );
};

export default Statistics;
