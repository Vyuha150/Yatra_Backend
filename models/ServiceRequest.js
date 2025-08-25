const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  clientName: String,
  companyName: String,
  phone: String,
  email: String,
  address: String,
  equipmentType: String,
  modelName: String,
  installationDate: String,
  issueTypes: [String],
  otherIssue: String,
  preferredDateTime: String,
  acknowledgeCharges: Boolean,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "in-progress", "completed", "cancelled"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
