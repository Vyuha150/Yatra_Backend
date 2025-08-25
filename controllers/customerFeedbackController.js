const CustomerFeedback = require("../models/CustomerFeedback");

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new CustomerFeedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await CustomerFeedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await CustomerFeedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
