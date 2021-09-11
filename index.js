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
        maxConns: 400,
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
                console.log("torrent " + torrent.name + " download finished");
                client.remove(magnetURI);
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
        console.log(line);
        downloadTorrent(line);
    });
};

readFile();
