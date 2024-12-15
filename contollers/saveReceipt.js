const { v4: uuidv4 } = require("uuid");
const { redisConn } = require("../utils/db");
const client = redisConn();
const { validateReceipt } = require("../utils/validateReceipt");
const { pointsCalculator } = require("../utils/pointsCalculator");
const receiptsHash = new Set();
const crypto = require("crypto");

module.exports.saveReceipt = async (req, res, next) => {
  try {
    const receipt = req.body;
    if (!validateReceipt(receipt)) {
      res.status(400).json({ error: "The receipt is invalid" });
      return;
    }
    //handling duplicate receipts
    const currReceiptHash = hashObject(receipt);
    if (receiptsHash.has(currReceiptHash)) {
      res.status(400).json({ error: "duplicate receipt" });
      return;
    }
    receiptsHash.add(currReceiptHash);

    const points = pointsCalculator(receipt);

    const id = uuidv4();
    client.set(id, points, (err) => {
      if (err instanceof TypeError && err.message === "Invalid argument type") {
        res
          .status(400)
          .json({ error: err.message || "The receipt is invalid" });
      } else if (err) {
        logger.error(`Server error while saving receipt: ${__filename}`, err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
      } else {
        res.status(200).json({ id });
      }
    });
  } catch (error) {
    next(error);
  }
};

function hashObject(obj) {
  const jsonString = JSON.stringify(obj);
  const hash = crypto.createHash("sha256").update(jsonString).digest("hex");
  return hash;
}
