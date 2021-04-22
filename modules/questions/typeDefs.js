
const {  gql } = require('apollo-server')
const typeDefs = gql`
  extend type Query{
    questions:[Question]
  }
  type Question{
    questionId: Int,
    readerId:Int,
    theme:String,
    library:String,
    questionText: String,
    questionStatus: Int,
    createdAt: String
  }
   extend type Mutation {
     createQuestion( readerId:Int, theme:Int,  library:Int, questionText: String,): Question
   }
   extend type Subscription{
     newQuestion:Question
   }
`
module.exports = typeDefs