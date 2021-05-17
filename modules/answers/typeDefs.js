
const {  gql } = require('apollo-server')
const typeDefs = gql`
  scalar Now
  extend type Query {
    answers:Answer
    rooms(roomId:Int):Room
    unreaded:[ Question]
  }
  type Room {
    roomId: Int
    answers: [Answer]
    questions:[Question]
  }
  type Answer{
    answerId:Int
    question:Question
    librarian: Librarian
    roomId:Int
    answerText:String
    createdAt:String    
  }
  extend type Mutation{
    createRoom(questionId:Int! librarianId:Int!): Now
    createAnswer(questionId:Int! librarianId:Int! answerText:String):Now
  }
 
`
module.exports = typeDefs