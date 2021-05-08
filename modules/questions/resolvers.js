const { QuestionModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const questions = new QuestionModel()
const resolvers = {
 
    Query:{
		questions:()=>questions.allQuestions()
	},
	Question:{
		questionId:global=>global.question_id,
		readerId: global=>global.reader_id,
		theme:global=>global.theme_name,
		library:global=> global.library_name,
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

