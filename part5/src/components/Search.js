import React from "react";

const Search = ({ onChangeHandler }) => {
  return (
    <>
      <form>
        Enter: <input type='text' onChange={onChangeHandler} />
      </form>
    </>
  );
};

export default Search;
