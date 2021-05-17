
const {  gql } = require('apollo-server')
const typeDefs = gql`
	extend type Query {
		lib:[Library],
		themes:[Theme]
	}
	type Library{
		libraryId:Int!,
		libraryName:String!
	}
	type Theme{
		themeId:Int!,
		themeName:String!
	}

 
`
module.exports = typeDefs