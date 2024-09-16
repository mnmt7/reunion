const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: String,
  rent: Number,
  location: String,
  beds: Number,
  bathrooms: Number,
  length: Number,
  breadth: Number,
  type: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
