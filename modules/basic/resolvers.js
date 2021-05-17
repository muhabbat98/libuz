const { BasicModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const basic = new BasicModel()
const resolvers = {
	Query :{
		lib:()=> basic.libraries(),
		themes:()=>basic.themes()
	},
	Library:{
		libraryId:(global)=>global.library_id,
		libraryName:global=>global.library_name
	},
	Theme:{
		themeId:global=>global.theme_id,
		themeName: global=>global.theme_name
	}

  };
  module.exports = resolvers

