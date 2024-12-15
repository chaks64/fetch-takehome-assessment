const redis = require("redis");
const logger = require("./logger");
const config = require('../config.json');

const redisConn = () => {
  const client = redis.createClient({
    legacyMode: true,
    socket: {
      host: config.db.host,
      port: config.db.port
    },
  });
  client.connect();
  client.on("connect", () => {
    logger.info(`Connected to Redis: ${__filename}`);
  });

  client.on("error", (err) => {
    logger.error(`Redis connection error: ${__filename}`, err);
  });

  return client;
};

function clearCache() {
  client.flushall((err, reply) => {
    if (err) {
      logger.error(
        `Error clearing Redis cache: ${__filename}`,
        `Error description: ${err}`
      );
    } else {
      logger.info(`Redis cache cleared successfully: ${__filename}`);
    }
    client.quit(); // Quit the Redis client connection
    process.exit(0); // Terminate the process
  });
}

module.exports = { redisConn, clearCache };
