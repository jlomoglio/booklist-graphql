const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

// init the express app
const app = express()

// allow cross-origin requests
app.use(cors())

// connect to mlab database 
mongoose.connect('mongodb://joe:20data65@ds049180.mlab.com:49180/graphql-books')
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

// graphql middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

// setip server port to run on
app.listen(5000, () => {
  console.log('server is running on port 5000')
})