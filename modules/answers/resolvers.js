const { AnswerModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const answers = new AnswerModel()
const resolvers = {
	Query :{
		rooms:(_, {roomId})=> answers.oneRoom(roomId),
		unreaded: ()=>answers.unreaded()
	},
    Mutation:{
		createRoom:async(_, {questionId, librarianId})=>{
				const [row]= await answers.createRoom(questionId, librarianId)
				return row
		},
		createAnswer:async(_, {questionId, answerText, librarianId})=>{
			const [row]= await answers.createAnswer(questionId, answerText, librarianId)
			return row
		}
    }

  };
  module.exports = resolvers

