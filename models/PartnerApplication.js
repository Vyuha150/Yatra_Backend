const mongoose = require("mongoose");

const partnerApplicationSchema = new mongoose.Schema({
  businessName: String,
  ownerName: String,
  phoneNumber: String,
  email: String,
  businessAddress: String,
  natureOfBusiness: [String],
  otherNature: String,
  yearsInOperation: String,
  regionsServed: String,
  representsOtherBrands: String,
  otherBrands: String,
  reason: String,
  exclusiveRegion: Boolean,
  acceptTerms: Boolean,
  profileFileName: String,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PartnerApplication", partnerApplicationSchema);
