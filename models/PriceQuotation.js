const mongoose = require("mongoose");

const priceQuotationSchema = new mongoose.Schema({
  fullName: String,
  company: String,
  phone: String,
  email: String,
  buildingType: String,
  otherBuildingType: String,
  address: String,
  floors: String,
  loadCapacity: String,
  productType: String,
  otherProductType: String,
  modelPreference: String,
  notes: String,
  consent: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PriceQuotation", priceQuotationSchema);
