
const {  gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    admins: [Admin],
    librarians:[Librarian],
    readers:[Reader]
  }
  type Admin{
    admin_id: Int,
    username:String!,
    password:String!
  }
  type Librarian{
    librarian_id: Int,
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    librarianPhone:Int,
    library:String
  }
  type Reader{
    reader_id: Int,
    username:String,
    password:String,
    readerEmail:String,
    readerRole:String,
    readerPhone:Int
  }
`
module.exports = typeDefs