const dbConfig = require('./Config/DB_Config')
const mongoose = require('mongoose')

mongoose.connect(dbConfig.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const db = mongoose.connection

const DBConnection = () => {
  try {
    db.once('open', () => {
      console.log('Database Connected successfully!!!')
    })
  } catch {
    db.on('error', console.error.bind(console, 'connection error:'))
  }
}

module.exports = DBConnection
