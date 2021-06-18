
const {  gql } = require('apollo-server')
const typeDefs = gql`
	extend type Query {
		lib:[Library],
		themes:[Theme]
		readerRoles:[ReaderRole]
	}
	type Library{
		libraryId:Int!,
		libraryName:String!
	}
	type Theme{
		themeId:Int!,
		themeName:String!
	}
	type ReaderRole{
		roleId:Int,
		roleName:String
	}

 
`
module.exports = typeDefs