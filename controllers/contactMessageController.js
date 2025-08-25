const ContactMessage = require("../models/ContactMessage");

exports.createMessage = async (req, res, next) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

// Admin: Get all contact messages
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// Admin: Update message status
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Status updated successfully", data: message });
  } catch (err) {
    next(err);
  }
};

// Admin: Delete message
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    next(err);
  }
};
