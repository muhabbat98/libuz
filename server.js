const { ApolloServer} = require('apollo-server-express')
const fileUpload = require('express-fileupload')
const express = require('express')
const http = require('http')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT||5000

const user = require('./modules/users/index')
const question = require('./modules/questions/')
const answers = require('./modules/answers')
const basic = require('./modules/basic')
const records = require('./modules/records')

const { bookUpload, imgUpload} = require('./modules/files')
const app = express()
// multer 
const multer = require("multer")

const storage =  multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './public')
    },
    filename:(req, file, cb)=>{
        cb(null, "myImage"+ Date.now()+ file.originalname)
    }
})
const upload = multer({storage:storage})

// middilewares


const modules  = [
    user,
    question,
    answers,
    basic,
    records
]

const server = new ApolloServer({modules,subscriptions: { path: '/subscriptions'},context:({req, connection})=>{
  if(connection){

    return({token: connection.context.token, usertype:connection.context.usertype})
  }
  else{
    return ({token:req.headers.token, usertype:req.headers.usertype})}
  }
})
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

app.post('/upload/book', upload.array("book", 100), bookUpload)

app.post('/upload/image', upload.array("images", 100), imgUpload)
app.get('*', (req, res)=>{
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

server.applyMiddleware({app, path:'/ill'})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)


httpServer.listen({port:PORT},(err) => {
  console.log(`🚀  Server ready at ${PORT + server.graphqlPath}`)
})

