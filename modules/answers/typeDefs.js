
const {  gql } = require('apollo-server')
const typeDefs = gql`
  scalar Now
  extend type Query {
    answers:[Answer]
    rooms(roomId:Int):[Room]
    unreaded(page:Int, limit:Int):[ Question]
    publicQuestions:[Now]
    isPublic(questionId:Int):Boolean
  }
  type Room {
    roomId: Int
    answers: Answer
    questions:Question
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
    updateQuestionStatus(questionId:Int!): Boolean
  }
  extend type Subscription{
    isPublicSubscript(questionId:Int):Boolean
  }
 
`
module.exports = typeDefs