const PriceQuotation = require("../models/PriceQuotation");

exports.createQuotation = async (req, res, next) => {
  try {
    const quotation = new PriceQuotation(req.body);
    await quotation.save();
    res.status(201).json({ message: "Quotation submitted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllQuotations = async (req, res, next) => {
  try {
    const quotations = await PriceQuotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (err) {
    next(err);
  }
};

exports.deleteQuotation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const quotation = await PriceQuotation.findByIdAndDelete(id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({ message: "Quotation deleted successfully" });
  } catch (err) {
    next(err);
  }
};
