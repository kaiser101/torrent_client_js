const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const logger = require("./logger");
const { bytesToMb, decToPerc, formatDecimal, msToMins } = require("./utils");
const { map, zipWith } = require("lodash");

let torrentMap = new Map();

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

                torrentMap.delete(torrent.name);
            });

            torrent.on("download", (bytes) => {
                logger.info(`Torrent: ${magnetURI}`);

                const { downloaded, downloadSpeed, progress, timeRemaining } =
                    torrent;

                const [_downloaded, _downloadSpeed, _progress, _timeRemaining] =
                    map(
                        zipWith(
                            [bytesToMb, bytesToMb, decToPerc, msToMins],
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

                torrentMap.set(torrent.name, _progress);
                fs.writeFileSync(
                    "./torrentdata.json",
                    JSON.stringify([...torrentMap], null, 2),
                    "utf-8"
                );

                logger.debug(`Total downloaded: ${_downloaded} MB`);
                logger.debug(`Download speed: ${_downloadSpeed} Mbps`);
                logger.debug(`Progress: ${_progress}`);
                logger.debug(`ETA: ${_timeRemaining}`);
                logger.debug();
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
