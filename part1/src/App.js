import { useState } from "react";

import Button from "./Button";
import Header from "./Header";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const reviewTypes = ["good", "neutral", "bad"];

  const giveReview = (reviewType) => {
    switch (reviewType) {
      case "good":
        return () => setGood(good + 1);
      case "neutral":
        return () => setNeutral(neutral + 1);
      case "bad":
        return () => setBad(bad + 1);
    }
  };

  return (
    <div>
      <Header />
      <Button
        onClickHandler={giveReview(reviewTypes[0])}
        name={reviewTypes[0]}
      />
      <Button
        onClickHandler={giveReview(reviewTypes[1])}
        name={reviewTypes[1]}
      />
      <Button
        onClickHandler={giveReview(reviewTypes[2])}
        name={reviewTypes[2]}
      />
      <Statistics texts={reviewTypes} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
