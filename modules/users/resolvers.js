const { UserModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const users = new UserModel()
const resolvers = {
    Query: {
      admins: async() => users.admins(),
      librarians:()=>users.librarians(),
      readers:()=>users.readers()
    },
    Admin: {
      adminId: (global)=> global.user_id
    },
    Librarian:{
      librarianId: global=> global.librarian_id,
      firstName: global=>global.first_name,
      lastName: global=>global.last_name,
      librarianPhone: global=>global.librarian_phone,
      library: global=> global.library_name
    },
    Reader:{
		readerId: global=> global.reader_id,
		readerEmail: global=>global.reader_email,
		readerPhone: global=> global.reader_phone,
		readerRole: global=> global.reader_role
    },
    Mutation:{
		addAdmin:async(_, {username, password}, context)=>{
			const [row] = await users.addAdmins(username, password)
			pubsub.publish("NEW_ADMIN", row)
			return row
		},
		addLibrarian:async(_,{username, password, firstName, lastName, librarianPhone, library },context)=>{
			const row = await users.addLibrarian(username, password, firstName, lastName, librarianPhone, library)
			return row
		},
		addReader:async(_,{username, password, readerEmail, readerRole, readerPhone },context)=>{
			const row = await users.addReader(username, password, readerEmail, readerRole, readerPhone)
			return row
		}
		
    },
	Subscription:{
		newAdmin:{
			subscribe:()=>pubsub.asyncIterator("NEW_ADMIN"),
			resolve:(payload, args, context, opt)=> payload
		}
	}
  };
  module.exports = resolvers

