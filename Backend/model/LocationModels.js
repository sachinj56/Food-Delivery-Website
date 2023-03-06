//import Mongoose

const mongoose = require("mongoose")

//create schema

const locationSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  city_id : {type:String,require:true},
  location_id: {type:Number,require:true},
  city:{type:String,require:true},
  country_name:{type:String,require:true}
})
///create a model
const locationModel = mongoose.model("locations",locationSchema)

module.exports = locationModel