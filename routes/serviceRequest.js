const express = require("express");
const router = express.Router();
const serviceRequestController = require("../controllers/serviceRequestController");

router.post("/", serviceRequestController.createRequest);
router.get("/", serviceRequestController.getAllRequests);
router.put("/:id/status", serviceRequestController.updateRequestStatus);
router.delete("/:id", serviceRequestController.deleteRequest);

module.exports = router;
