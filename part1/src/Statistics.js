import React from "react";

import StatisticsLine from "./StatisticsLine";

const Statistics = ({ texts, good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / (good + neutral + bad)) * 100 || 0;
  const positive = (good / (good + neutral + bad)) * 100 || 0;
  const textsArray = texts.concat(["all", "average", "positive"]);

  if (all) {
    return (
      <>
        <StatisticsLine text={textsArray[0]} value={good} sign={""} />
        <StatisticsLine text={textsArray[1]} value={neutral} sign={""} />
        <StatisticsLine text={textsArray[2]} value={bad} sign={""} />
        <StatisticsLine text={textsArray[3]} value={all} sign={""} />
        <StatisticsLine text={textsArray[4]} value={average} sign={""} />
        <StatisticsLine text={textsArray[5]} value={positive} sign={"%"} />
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

export default Statistics;
