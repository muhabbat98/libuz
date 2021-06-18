
const {  gql } = require('apollo-server')
const typeDefs = gql`
  scalar roomList
  extend type Query{
    questions(questionId:Int):[Question]
    libUnread(readerId:Int):[Question],
    readerUnread(readerId:Int):roomList
    readerRooms(readerId:Int):[roomList]
    notAnsweredQuestion(readerId:Int):[Question],
    notAnsweredRoom(roomId:Int):[Question]
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
     roomQuestion(roomId:Int, questionText:String):roomList
   }
   extend type Subscription{
     newQuestion:Question,
     newRoomQuestion(roomId:Int):roomList
   }
`
module.exports = typeDefs