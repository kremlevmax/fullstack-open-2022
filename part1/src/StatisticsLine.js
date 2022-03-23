import React from "react";

const StatisticsLine = ({ text, value, sign }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <tr>
      <td>{capitalizeFirstLetter(text)}:</td>
      <td>
        {value}
        {sign}
      </td>
    </tr>
  );
};

export default StatisticsLine;
