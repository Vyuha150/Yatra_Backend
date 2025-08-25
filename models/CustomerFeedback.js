const mongoose = require("mongoose");

const CustomerFeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  productTypes: [{ type: String }],
  otherProduct: { type: String },
  location: { type: String },
  feedback: { type: String, required: true },
  showcasePermission: { type: String, enum: ["Yes", "No"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CustomerFeedback", CustomerFeedbackSchema);
