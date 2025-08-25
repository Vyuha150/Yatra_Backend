const express = require("express");
const router = express.Router();
const priceQuotationController = require("../controllers/priceQuotationController");

router.post("/", priceQuotationController.createQuotation);
router.get("/", priceQuotationController.getAllQuotations);
router.delete("/:id", priceQuotationController.deleteQuotation);

module.exports = router;
