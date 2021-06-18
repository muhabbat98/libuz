const { AnswerModel} = require("./model")
const { QuestionModel} = require("../questions/model")

const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment(val).format('LLLL')

const answers = new AnswerModel()
const questions = new QuestionModel()

const resolvers = {
	Query :{
		answers:()=>answers.answer(),
		rooms:async(_, {roomId})=>  answers.oneRoom(roomId),
		unreaded: (_,{page,limit})=>answers.unreaded(page, limit),
		isPublic:(_,{questionId}) =>answers.isPublic(questionId)
	},
	Room:{
		roomId: global=>global.room_id,
		answers: (global)=> ({answer_id: global.answer_id, question_id: global.question_id, librarian_id:global.librarian_id, room_id:global.room_id, answer_text:global.answer_text, created_at: global.created_at}),
		questions:async(global)=>{
			const [row] = await questions.oneQuestion(global.question_id)
			return row
		}
	},
	Answer:{
		answerId:global=>global.answer_id,
		answerText: global=>global.answer_text,
		createdAt:global=>time(global.created_at),
		question: async(global)=>{
			const [row] = await questions.oneQuestion(global.question_id)
			return row
		}
	},
    Mutation:{
		createRoom:async(_, {questionId, librarianId})=>{
			
				const [row]= await answers.createRoom(questionId, librarianId)
				return row
		},
		createAnswer:async(_, {questionId, answerText, librarianId})=>{
			const [row]= await answers.createAnswer(questionId, answerText, librarianId)
			return row
		},
		updateQuestionStatus: async(_,{questionId})=>{
			const row  = await answers.updateQuestionStatus(questionId)
			pubsub.publish("QUESTION_STATUS",row)
			return row
		}
    },
	Subscription:{
		isPublicSubscript:{
			subscribe:() => pubsub.asyncIterator("QUESTION_STATUS"),
			resolve:(payload)=>payload
		}
	
	}

  };
  module.exports = resolvers

