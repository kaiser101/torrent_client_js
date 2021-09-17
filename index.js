const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const log4js = require("log4js");

log4js.configure({
    appenders: { torrent: { type: "file", filename: "torrent.log" } },
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
            logger.info("name " + torrent.name);

            torrent.on("done", () => {
                logger.info("torrent " + torrent.name + " download finished");
                client.destroy((err) => {
                    logger.warn(err);
                });
            });

            torrent.on("download", (bytes) => {
                logger.info("just downloaded: " + bytes);
                logger.info("total downloaded: " + torrent.downloaded);
                logger.info("download speed: " + torrent.downloadSpeed);
                logger.info("progress: " + torrent.progress);
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
