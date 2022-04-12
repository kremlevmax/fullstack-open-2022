const _ = require("lodash");

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
  return winner;
};

const mostBlogs = (array) => {
  const authorsObject = _.countBy(array, "author");
  const authorsPairs = _.sortBy(_.toPairs(authorsObject)).reverse();
  const winner = authorsPairs[0];
  return winner[0];
};

const mostLikes = (array) => {
  const authorsAndLikesArray = _(array)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      totalLikes: _.sumBy(objs, "likes"),
    }))
    .value();
  const sorted = _.sortBy(authorsAndLikesArray, "totalLikes").reverse();
  return sorted[0].author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
