const log4js = require("log4js");

log4js.configure({
    appenders: {
        torrent: {
            type: "dateFile",
            pattern: "yyyy-MM-dd",
            keepFileExt: true, //
            maxLogSize: 1024 * 1024 * 10, //1024 * 1024 * 1 = 1M
            backups: 2, //
            alwaysIncludePattern: true, //
            daysToKeep: 3, //
            filename: "torrent.log",
        },
    },
    categories: { default: { appenders: ["torrent"], level: "info" } },
});
const logger = log4js.getLogger("torrent");

module.exports = logger;
