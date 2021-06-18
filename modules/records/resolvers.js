const { RecordModel} = require("./model")
const pubsub = require('../../require/pubsub')
const {sign, verify}= require('../../require/jwt')
const moment = require("moment")
const { subscriptions } = require("../../require/pubsub")
const time = val=>moment().fromNow(val)
const PDFDocument = require('pdfkit');
const fs  = require('fs')
const path = require('path')
const record = new RecordModel()
const resolvers = {
	Query :{
		records:(_,{page, limit})=> record.allRecords(page, limit),
		mostDownloaded:()=>record.mostDownloaded()
	},
	Record:{
		fieldId: global=>global.fiel_id,
		fileId: async(global) =>{
			const [row] = await record.file(global.file_id)
			return row
		},
		imageId: async(global) =>{
			const [row] = await record.image(global.image_id)
			return row
		},
		countOfDownloads:async(global)=>{

			const [row] = await record.totalCount(global.file_id)
	
			return row? row.count : 0
		}
	},
	Mutation:{
		createRecord: async(_, {records})=>{
		
			const [row] = await record.createNewRecord(records.title, records.fileId, records.imageId, records.creator, records.subject, records.description,	records.type, records.source, records.relation, records.coverage, records.publisher,records.contributor, records.rights, records.date, records.format, records.identifier, records.language, records.audience,	records.provenance,	records.right_holders, records.instructional_method, records.accrual_method, records.accrual_periodicity, records.accrual_policy)
			// console.log(row)
			let data = 'Author: ' +	records.creator +"\nTitle:" +records.title+ "\nSubject: "+ records.subject + "\nDescription: "+ records.description + "\nExtent/scope: " + records.coverage+', '+records.format +"\n Date: "+ records.data + 'y.' +"\nISBN/ISSN/DOI: "+ records.identifier + "\nPublisher: "+ records.publisher

			let nameRecord = Date.now()
			// console.log(`public/records/${records.title + Date()}.pdf`)
			let pdfDoc = new PDFDocument;
			pdfDoc.pipe(fs.createWriteStream(`public/records/${nameRecord}.pdf`));
			pdfDoc.text(data, 50, 50);
			pdfDoc.end();

			// console.log({ path: `public/records/${Date.now()}.pdf` })
			return { path: `records/${nameRecord}.pdf` }
		},
		dowloadedRecord:async(_, {fileId} )=>{
			const [row] = await record.addCount(fileId)
			pubsub.publish("BOOK_DOWNLOADED", row)
			// console.log(row)
			return row.count
		}
	},
	Subscription:{
		subscribeDownload:{
			subscribe:()=>pubsub.asyncIterator("BOOK_DOWNLOADED"),
			resolve: (payload)=> payload
		}
	}
  };
  module.exports = resolvers

