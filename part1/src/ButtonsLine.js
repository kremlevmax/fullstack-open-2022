import React from "react";
import Button from "./Button";

const ButtonsLine = ({
  reviewTypes,
  giveGoodReview,
  giveNeutralReview,
  giveBadReview,
}) => {
  return (
    <>
      <tr>
        <td colSpan='2'>
          <Button onClickHandler={giveGoodReview} name={reviewTypes[0]} />
          <Button onClickHandler={giveNeutralReview} name={reviewTypes[1]} />
          <Button onClickHandler={giveBadReview} name={reviewTypes[2]} />
        </td>
      </tr>
      <tr>
        <td>
          ___________
          <br />
        </td>
      </tr>
    </>
  );
};

export default ButtonsLine;
