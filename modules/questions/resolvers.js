const { QuestionModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment(val).format('LLLL')
const { withFilter } = require('apollo-server');

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
		},
		notAnsweredRoom:async(_,{roomId})=>{
			const row  = await questions.notAnsweredRoom(roomId)
			return row
		},
		notAnsweredQuestion:async(_,{readerId})=>{
			const row  = await questions.notAnsweredQuestion(readerId)
			return row
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
		createdAt: global=>time(global.question_created_at)
	},
	File:{
		fileId: global=>global.file_id
	},
	Image:{
		imageId: global=>global.image_id
	},
	Mutation:{
		createQuestion:async(_ ,{readerId, theme,library, questionText}, {token})=>{
			verify(token)
			const [rows] = await questions.createQuestion(readerId, theme,library, questionText)
			pubsub.publish("NEW_QUESTION", rows)
			return rows
		},
		roomQuestion:async(_, {roomId, questionText},{token})=>{
			verify(token)
			const [rows] = await questions.roomQuestion(roomId, questionText)
			
			pubsub.publish("NEW_ROOM_QUESTION", rows)
			return rows
		}
	},
	Subscription:{
		newQuestion:{
			subscribe:()=>pubsub.asyncIterator("NEW_QUESTION"),
			resolve:(payload)=>payload
		},
		newRoomQuestion:{
			subscribe:withFilter(
				()=>pubsub.asyncIterator("NEW_ROOM_QUESTION"),
				(payload,variables)=>{
					return payload.room_id===variables.roomId
				}
			),
			resolve:(payload)=>{
				return payload
			}
		}
	}
  };
  module.exports = resolvers

