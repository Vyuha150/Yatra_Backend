const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/customerFeedbackController");

router.post("/", submitFeedback);
router.get("/", getAllFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
