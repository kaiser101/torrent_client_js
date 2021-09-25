const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const log4js = require("log4js");
const _ = require("lodash");
const { bytesToMb, decToPerc, formatDecimal } = require("./utils");

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

const downloadTorrent = (magnetURI) => {
    let client = new WebTorrent({
        utp: true,
    });

    client.add(
        magnetURI,
        {
            announce: opts.getOpts().tracker.announce,
            path: ".",
        },
        (torrent) => {
            logger.info(`Name ${torrent.name}`);

            torrent.on("done", () => {
                logger.info(`Torrent ${torrent.name} download finished`);

                client.destroy((err) => {
                    logger.warn(err);
                });
            });

            torrent.on("download", (bytes) => {
                logger.info(`Just downloaded: ${bytes}`);

                const { downloaded, downloadSpeed, progress } = torrent;

                const [_downloaded, _downloadSpeed, _progress] = _.map(
                    _.zipWith(
                        [bytesToMb, bytesToMb, decToPerc],
                        [downloaded, downloadSpeed, progress],
                        (x, y) => x(y)
                    ),
                    formatDecimal
                );

                logger.info(`Total downloaded: ${_downloaded} MB`);
                logger.info(`Download speed: ${_downloadSpeed} Mbps`);
                logger.info(`Progress: ${_progress}`);
                logger.info();
            });
        }
    );
};

const readFile = () => {
    let lineReader = readLine.createInterface({
        input: fs.createReadStream("torrents.txt"),
    });

    lineReader.on("line", (line) => {
        logger.info(line);
        downloadTorrent(line);
    });
};

readFile();
