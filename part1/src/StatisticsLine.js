import React from "react";

const StatisticsLine = ({ text, value, sign }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <p>
      {capitalizeFirstLetter(text)}: {value}
      {sign}
    </p>
  );
};

export default StatisticsLine;
