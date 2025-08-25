const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, required: true },
  link: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
