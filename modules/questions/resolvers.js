const { QuestionModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const questions = new QuestionModel()
const resolvers = {
 
    Query:{
		questions:(_,{questionId})=> questionId ? questions.oneQuestion(questionId) : questions.allQuestions(),
		libUnread:async(_, {readerId}, {token})=>{
			try{
				const user = await verify(token)
				if(user){
					return await questions.libUnread(readerId)
				}
			}
			catch(err){
				throw err.message
			}
		},
		readerRooms:async(_, {readerId},{token, usertype})=>{
			try{
				const user = await verify(token)

				if(user&& usertype==3){
					return await questions.readerRooms(readerId)
				}
			}
			catch(err){
				throw err.message
			}
		},
		readerUnread:async(_, {readerId},{token, usertype})=>{
			try{
				const user = await verify(token)

				if(user&&usertype==3){
					return await questions.readerUnread(readerId)
				}
				else{
					throw new Error("you dont have permission for this route")
				}
			}
			catch(err){
				throw err.message
			}
		}
	},
	Question:{
		questionId:global=>global.question_id,
		readerId: global=>global.reader_id,
		theme:global=>global.theme_name,
		library:async(global)=> {
			const [row] =  await questions.libraryName(global.library_id)
			return row ? row.library_name : null
		},
		questionText: global=> global.question_text,
		questionStatus: global=>global.question_status,
		createdAt: global=>time(global.created_at)
	},
	Mutation:{
		createQuestion:async(_ ,{readerId, theme,library, questionText}, {token})=>{
			verify(token)
			const [rows] = await questions.createQuestion(readerId, theme,library, questionText)
			pubsub.publish("NEW_QUESTION", rows)
			return rows
		}
	},
	Subscription:{
		newQuestion:{
			subscribe:()=>pubsub.asyncIterator("NEW_QUESTION"),
			resolve:(payload)=>payload
		}
	}
  };
  module.exports = resolvers

