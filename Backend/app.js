const express = require('express')
const mongoose = require("mongoose")
var cors = require('cors')
const mongoURI = "mongodb://localhost:27017/edureka"


const app = express()
const port = 3001
const APIRouter = require('./Routes/ApiRouter')
app.use(cors())
// enable incoming data 
app.use(express.json()) // enables json request 
app.use(express.urlencoded({extended:false})) // enable's form-data (data + file uploaded)
app.use('/api',APIRouter)

function connectToMongo() {
    mongoose.connect(mongoURI, () => {
        console.log("connected to Mongo successfully")
    })
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
connectToMongo()