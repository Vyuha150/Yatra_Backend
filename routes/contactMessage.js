const express = require("express");
const router = express.Router();
const contactMessageController = require("../controllers/contactMessageController");

// Customer route
router.post("/", contactMessageController.createMessage);

// Admin routes
router.get("/", contactMessageController.getAllMessages);
router.put("/:id/status", contactMessageController.updateMessageStatus);
router.delete("/:id", contactMessageController.deleteMessage);

module.exports = router;
