const logger = require("../utils/logger");
const { redisConn } = require("../utils/db");
const { pointsCalculator } = require("../utils/pointsCalculator");
const client = redisConn();

module.exports.retrivePoints = async (req, res, next) => {
  try {
    const key = req.params.id;
    client.get(key, (err, value) => {
      if (err) {
        logger.error(`Server error while retriving points: ${__filename}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (value) {
        // let points = pointsCalculator(JSON.parse(value));
        res.status(200).json({ value });
      } else {
        res.status(404).json({ error: `No receipt found for ${key} id` });
      }
    });
  } catch (error) {
    next(error);
  }
};