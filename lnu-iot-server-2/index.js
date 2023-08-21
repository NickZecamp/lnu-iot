const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const homedataRouter = require('./routes/homedata.routes')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = config.get('serverPort')
const cors = require('cors')
const chartService = require('./services/chartService')


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [config.get('clientURL'), config.get('clientURL_local')],
    credentials:true,
    optionSuccessStatus:200,
    secure:true,
}))
app.use("/api/homedata",homedataRouter)

const start = async () => {
  try {

      mongoose.connect(config.get("dbURL"), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: 'db_homedata',
      })

      app.listen(PORT, () => {
          console.log('Server started on port: ', PORT)
      })

      setInterval(async () => {
          await chartService()
      }, 10000); // 10000 milliseconds = 10 seconds

  } catch (e) {

  }
}
start()
console.log("Hello world!")