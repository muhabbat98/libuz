
const {  gql } = require('apollo-server')

const typeDefs = gql`
  scalar Response
  type Query {
    admins: [Admin],
    librarians:[Librarian],
    readers:[Reader]
  }
  type Admin{
    adminId: Int,
    username:String!,
    password:String!
  }
  type Librarian{
    librarianId: Int,
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    librarianPhone:String,
    library:String
  }
  type Reader{
    readerId: Int,
    username:String,
    password:String,
    readerEmail:String,
    readerRole:String,
    readerPhone:String
  }
  type Mutation {
    addAdmin( username:String!, password:String!):Admin
    addLibrarian(
		username:String,
		password:String,
		firstName:String,
		lastName:String,
		librarianPhone:String,
		library:Int
    ): Librarian
	addReader(
		username:String,
		password:String,
		readerEmail:String,
		readerRole:Int,
		readerPhone:String
	):Response
    }
	type Subscription{
		newAdmin:Admin
	}
`
module.exports = typeDefs