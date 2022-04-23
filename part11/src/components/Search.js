import React from "react";

const Search = ({ onChangeHandler }) => {
  return (
    <form>
      <h2>Search by blog name:</h2>
      <input
        onChange={onChangeHandler}
        onKeyPress={(event) => event.key === "Enter" && event.preventDefault()}
      ></input>
    </form>
  );
};

export default Search;
