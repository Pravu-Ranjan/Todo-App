const app = require('./App')
const DBConnection = require('./Database')
require('dotenv').config()

const PORT = process.env.PORT || 9009

//Database Connection

app.listen(PORT, DBConnection(), () =>
  console.log(`Server up and running on port: ${PORT}`)
)
