const express = require("express");
const router = express.Router();
const partnerApplicationController = require("../controllers/partnerApplicationController");

router.post("/", partnerApplicationController.createApplication);
router.get("/", partnerApplicationController.getAllApplications);
router.put("/:id/status", partnerApplicationController.updateApplicationStatus);
router.delete("/:id", partnerApplicationController.deleteApplication);

module.exports = router;
