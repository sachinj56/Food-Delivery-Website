const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  city: { type: String },
  location_id: { type: Number },
  city_id: { type: Number },
  locality: { type: String },
  thumb: { type: Array },
  aggregate_rating: { type: Number },
  rating_text: { type: String },
  min_price: { type: Number },
  contact_number: { type: Number },
  cuisine_id: { type: Array },
  cuisine: { type: Array },
  image: { type: String },
  mealtypeid: { type: Number },
});

const RestaurantModel = mongoose.model(
  "restaurants",
  RestaurantSchema,
  
);

module.exports = RestaurantModel;