import { useState } from "react";

import ButtonsLine from "./ButtonsLine";
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
    <table>
      <tbody>
        <Header text={"Give Feedback"} />
        <ButtonsLine
          reviewTypes={reviewTypes}
          giveGoodReview={giveReview(reviewTypes[0])}
          giveNeutralReview={giveReview(reviewTypes[1])}
          giveBadReview={giveReview(reviewTypes[2])}
        />
        <Header text={"Statistics"} />
        <Statistics
          texts={reviewTypes}
          good={good}
          neutral={neutral}
          bad={bad}
        />
      </tbody>
    </table>
  );
};

export default App;
