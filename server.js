const { ApolloServer, gql } = require('apollo-server')
const user = require('./modules/users/index')
const modules  = [
    user
]

const server = new ApolloServer({modules});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
