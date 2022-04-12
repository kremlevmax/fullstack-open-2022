const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  let result = array.length === 0 ? 0 : array[0].likes;
  array.map((arrayItem) => {
    result = result < arrayItem.likes ? arrayItem.likes : result;
  });
  const winner = array.find((arrayItem) => arrayItem.likes === result);
  console.log(winner);
  return winner;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
