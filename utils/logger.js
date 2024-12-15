const winston = require("winston");
const fs = require("fs");

const customFormat = winston.format.printf(
  ({ level, message, label, timestamp, file }) => {
    const filePos = file ? `${file}` : "N/A";
    return `${timestamp} [${label}] ${level}: ${message}`;
  }
);

const createLogger = (options = {}) => {
  const { filename = "logfile.log" } = options;

  // Delete log file on server restart
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.label({ label: "MyApp" }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format((info) => {
        if (!info.file) {
          const stack = new Error().stack.split("\n");
          const stackLine = stack[stack.length > 3 ? 3 : 2].trim();
          const filePathMatches = stackLine.match(/\((.*):\d+:\d+\)$/);
          info.file = filePathMatches ? filePathMatches[1] : "N/A";
        }
        return info;
      })(),
      customFormat
    ),
    transports: [new winston.transports.File({ filename })],
  });

  return logger;
};

const logger = createLogger();

module.exports = logger;
