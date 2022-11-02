require ('dotenv').config()

const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(()  => console.log('Conexão com o banco estabelecida com sucesso!')).catch((error) => console.log(error))

