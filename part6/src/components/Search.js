import React from "react";

const Search = ({ onChangeFilterHandler }) => {
  return (
    <form>
      <div>
        name: <input onChange={onChangeFilterHandler} />
      </div>
    </form>
  );
};

export default Search;
