const express = require("express");
const { saveReceipt } = require("../contollers/saveReceipt");
const { retrivePoints } = require("../contollers/retrivePoints");
const router = express.Router();

router.post("/process",saveReceipt);
router.get("/:id/points",retrivePoints)

module.exports = router