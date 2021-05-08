const { AnswerModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const answers = new AnswerModel()
const resolvers = {
 
    Mutation:{
		createRoom:async(_, {questionId, librarianId})=>{
				const [row ] = await answers.createRoom(questionId, librarianId)
				return row.room_id
		}
    }

  };
  module.exports = resolvers

