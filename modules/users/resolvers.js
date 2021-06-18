const { UserModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const users = new UserModel()
const resolvers = {
    Query: {
      admins: async() => users.admins(),
      librarians:(_,{librarianId})=>users.librarians(librarianId),
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
			try{
				const row = await users.addLibrarian(username, password, firstName, lastName, librarianPhone, library)
				return{
					status:200,
					token:sign({payload: row.librarian_id}),
					data:row
				}
			}
			catch(err){
				return{
					status:401,
					message:err.message
				}
			}
			
		},
		addReader:async(_,{username, password, readerEmail, readerRole, readerPhone })=>{
			try{
				const row = await users.addReader(username, password, readerEmail, readerRole, readerPhone)
				return{
					status:200,
					token:sign({payload: row.reader_id}),
					data:row
				}
			}
			catch(err){
				return{
					status:401,
					message:err.message
				}
			}
		},
		loginReader:async(_,{username, password})=>{
			
			try{

				const row = await users.checkReader(username, password)
				return{
					status:200,
					token:sign({payload: row.reader_id}),
					data:row
				}
			}
			catch(err){
				return{
					status:401,
					message:"auth error username or password invalid"
				}
			}
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

