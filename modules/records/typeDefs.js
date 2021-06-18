
const {  gql } = require('apollo-server')
const typeDefs = gql`
	scalar Downloaded
	scalar Path
	extend type Query {
		records(page:Int, limit:Int):[Record],
		mostDownloaded:[Record]
	}
	type File {
		fileId:Int,
		path:String,
		filename:String,
		mimetype:String
	}
	type Image {
		imageId:Int,
		path:String,
		filename:String,
		mimetype:String
	}
	
	type Record{
		fieldId: Int,
    	title:String,
    	fileId: File ,
    	imageId: Image,
		creator:String,
    	subject: String,
    	description: String,
    	type: String,
    	source: String,
    	relation: String,
    	coverage: String,
    	publisher: String,
    	contributor: String,
    	rights: String,
    	date: String,
    	format: String,
    	identifier:String,
    	language: String,
    	audience:String,
    	provenance: String,
    	right_holders: String,
    	instructional_method:String,
    	accrual_method: String,
    	accrual_periodicity:String,
    	accrual_policy:String,
		countOfDownloads:Int
	}
	input InputRecord{
		fieldId: Int,
    	title:String,
    	fileId: Int ,
    	imageId: Int,
		creator:String,
    	subject: String,
    	description: String,
    	type: String,
    	source: String,
    	relation: String,
    	coverage: String,
    	publisher: String,
    	contributor: String,
    	rights: String,
    	date: String,
    	format: String,
    	identifier:String,
    	language: String,
    	audience:String,
    	provenance: String,
    	right_holders: String,
    	instructional_method:String,
    	accrual_method: String,
    	accrual_periodicity:String,
    	accrual_policy:String
	}
	
	extend type Mutation{
		createRecord(records: InputRecord):Path,
		dowloadedRecord(fileId:Int!):Int
	}
	extend type Subscription{
		subscribeDownload:Downloaded
	}
 
`
module.exports = typeDefs