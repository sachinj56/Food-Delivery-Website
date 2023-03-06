// import mongosse 
const { default: mongoose } = require("mongoose")
const mongooose = require("mongoose")

// Create a schema

const MealTypeSchema = new mongoose.Schema({
    name : {type:String,required:true},
    content:{type:String,required:true},
    image:{type:String,required:true},
    meal_type:{type:String,require:true}
})

//Create a model

const MealTypeModel = mongoose.model('mealtypes',MealTypeSchema)

module.exports = MealTypeModel