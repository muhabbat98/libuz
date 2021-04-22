const app = require('express')()
const { ApolloServer, gql } = require('apollo-server-express')
const http = require('http')
const PORT = process.env.PORT||5000
const user = require('./modules/users/index')
const question = require('./modules/questions/index')

const modules  = [
    user,
    question
]

const server = new ApolloServer({modules,subscriptions: {  path: '/subscriptions'}})

server.applyMiddleware({app, path:'/ill'})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({port:PORT},(err) => {
  console.log(`🚀  Server ready at ${PORT + server.graphqlPath}`)
})

