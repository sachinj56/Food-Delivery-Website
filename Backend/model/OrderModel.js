const mongoose = require("mongoose")

const OrderModelSchema = new mongoose.Schema({
    order_List : {type:Array,required:true},
    total:{type:Number,require:true},
    user_email:{type:String,require:true},
    mobile:{type:Number,require:true},
    order_id:{type:String,require:true},
    payment_id:{type:String,require:true},
    order_status:{type:Boolean,require:true},
    username:{type:String},
    address:{type:String}

},{versionKey:false})

const OrderModel = mongoose.model("orders",OrderModelSchema);
module.exports = OrderModel;