const books = require("./model")

const resolvers = {
    Query: {
      books: () => books,
    },
  };
  module.exports = resolvers

