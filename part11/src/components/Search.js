import React from "react";

const Search = ({ onChangeHandler }) => {
  return (
    <form>
      <h2>Search by author:</h2>
      <input onChange={onChangeHandler}></input>
    </form>
  );
};

export default Search;
