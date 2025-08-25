const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  projectType: String,
  message: String,
  status: {
    type: String,
    enum: ["new", "responded", "closed"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
