const appRoot = require("app-root-path");
const winston = require("winston");

var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5232880, //5mb
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

var logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: "error",
    }),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
