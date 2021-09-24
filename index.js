const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const log4js = require("log4js");
const _ = require("lodash");

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

const bytesToMb = (x) => x / 1048576;

const decToPerc = (x) => x * 100;

const formatDecimal = (x) =>
    x.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
        maximumFractionDigits: 2,
    });

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
                    [
                        bytesToMb(downloaded),
                        bytesToMb(downloadSpeed),
                        decToPerc(progress),
                    ],
                    formatDecimal
                );

                logger.info(`Total downloaded: ${_downloaded}`);
                logger.info(`Download speed: ${_downloadSpeed}`);
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
