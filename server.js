const app = require('express')()
const { ApolloServer, gql } = require('apollo-server-express')
const http = require('http')
const PORT = process.env.PORT||5000
const user = require('./modules/users/index')
const question = require('./modules/questions/')
const answers = require('./modules/answers')
const basic = require('./modules/basic')


const modules  = [
    user,
    question,
    answers,
    basic
]

const server = new ApolloServer({modules,subscriptions: { path: '/subscriptions'},context:({req, connection})=>{
  if(connection){

    return({token: connection.context.token, usertype:connection.context.usertype})
  }
  else{
    return ({token:req.headers.token, usertype:req.headers.usertype})}
  }
})

server.applyMiddleware({app, path:'/ill'})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({port:PORT},(err) => {
  console.log(`🚀  Server ready at ${PORT + server.graphqlPath}`)
})

