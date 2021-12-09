const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const logger = require("./logger");
const { bytesToMb, decToPerc, formatDecimal, msToSec } = require("./utils");
const { map, zipWith } = require("lodash");

const downloadTorrent = (magnetURI) => {
    let client = new WebTorrent({
        utp: true,
    });

    client.add(
        magnetURI,
        {
            announce: opts.getOpts().tracker.announce,
            path: "./torrents",
        },
        (torrent) => {
            logger.info(`Name ${torrent.name}`);

            torrent.on("done", () => {
                logger.info(`Torrent ${torrent.name} download finished`);

                client.remove(magnetURI, (err) => {
                    logger.warn(err);
                });

                client.destroy((err) => {
                    logger.warn(err);
                });
            });

            torrent.on("download", (bytes) => {
                logger.info(`Torrent: ${magnetURI}`);

                const { downloaded, downloadSpeed, progress, timeRemaining } =
                    torrent;

                const [_downloaded, _downloadSpeed, _progress, _timeRemaining] =
                    map(
                        zipWith(
                            [bytesToMb, bytesToMb, decToPerc, msToSec],
                            [
                                downloaded,
                                downloadSpeed,
                                progress,
                                timeRemaining,
                            ],
                            (x, y) => x(y)
                        ),
                        formatDecimal
                    );

                logger.info(`Total downloaded: ${_downloaded} MB`);
                logger.info(`Download speed: ${_downloadSpeed} Mbps`);
                logger.info(`Progress: ${_progress}`);
                logger.info(`ETA: ${_timeRemaining}`);
                logger.info();
            });
        }
    );
};

const readFile = () => {
    let lineReader = readLine.createInterface({
        input: fs.createReadStream("torrents.txt"),
    });

    lineReader.on("line", downloadTorrent);
};

readFile();
