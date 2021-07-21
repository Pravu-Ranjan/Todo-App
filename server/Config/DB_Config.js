require('dotenv').config()
const databaseUser = process.env.MONGO_DB_USER
const databasePassword = process.env.MONGO_DB_PASSWORD
const databaseName = process.env.MONGO_DB_NAME

module.exports = {
  mongouri: `mongodb+srv://${databaseUser}:${databasePassword}@todoapp.wfqpr.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
}
