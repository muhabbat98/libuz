const { BasicModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const time = val=>moment().fromNow(val)

const basic = new BasicModel()
const resolvers = {
	Query :{
		lib:()=> basic.libraries(),
		themes:()=>basic.themes(),
		readerRoles:()=>basic.readerRole()
	},
	Library:{
		libraryId:(global)=>global.library_id,
		libraryName:global=>global.library_name
	},
	Theme:{
		themeId:global=>global.theme_id,
		themeName: global=>global.theme_name
	},
	ReaderRole:{
		roleId:global=>global.reader_role_id,
		roleName:global=>global.reader_role
	}


  };
  module.exports = resolvers

