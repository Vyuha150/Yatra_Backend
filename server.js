require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const priceQuotationRoutes = require("./routes/priceQuotation");
const serviceRequestRoutes = require("./routes/serviceRequest");
const partnerApplicationRoutes = require("./routes/partnerApplication");
const contactMessageRoutes = require("./routes/contactMessage");
const customerFeedbackRoutes = require("./routes/customerFeedback");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:8080", // your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/price-quotation", priceQuotationRoutes);
app.use("/api/service-request", serviceRequestRoutes);
app.use("/api/partner-application", partnerApplicationRoutes);
app.use("/api/contact-message", contactMessageRoutes);
app.use("/api/customer-feedback", customerFeedbackRoutes);
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/yatra", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
