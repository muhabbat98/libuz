
const {  gql } = require('apollo-server')
const typeDefs = gql`

  extend type Mutation{
    createRoom(questionId:Int! librarianId:Int!): Int
  }
 
`
module.exports = typeDefs