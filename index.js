"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const receiptRoutes = require("./routes/receiptRoutes");
const logger = require("./utils/logger")
const config = require('./config.json');
const port = config.port

//swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./utils/api.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//redis clean up
const { redisConn } = require("./utils/db");
const client = redisConn();
//clear db when server is terminated (not to persist data in db)
function clearCache() {
  client.flushAll(() => {
    logger.info('Redis cleared.');
    client.quit(() => {
      logger.info('Redis connection closed.');
      process.exit();
    });
  });
}

// Listen for the server shutdown event
process.on("SIGINT", clearCache); // For Ctrl+C
process.on("SIGTERM", clearCache); // For server termination

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.use("/receipts", receiptRoutes);

module.exports = app.listen(port, () => {
  // logger.info(`Server started on Port ${port}: ${__filename}`);
  console.log(`Server started on Port ${port}: ${__filename}`);
});
