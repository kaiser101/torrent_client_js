const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const logger = require("./logger");
const _ = require("lodash");
const { bytesToMb, decToPerc, formatDecimal } = require("./utils");

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

                client.remove(magnetURI, (err) => {
                    logger.warn(err);
                });

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
