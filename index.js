require("dotenv").config();
const WebTorrent = require("webtorrent");
const opts = require("./opts");
const readLine = require("readline");
const fs = require("fs");
const logger = require("./logger");
const { bytesToMb, decToPerc, formatDecimal, msToMins } = require("./utils");
const { map, zipWith, isEmpty } = require("lodash");
const sendMessage = require("./sendMessage");

const torrentMap = new Map();

const client = new WebTorrent({
    utp: true,
});

const downloadTorrent = (magnetURI) => {
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

                torrentMap.remove(torrent.name);

                client.remove(magnetURI, (err) => {
                    logger.warn(err ?? "Torrent removed");
                });

                if (isEmpty(client.torrents)) {
                    client.destroy((err) => {
                        logger.warn(err ?? "Torrent client killed");
                    });
                }
            });

            torrent.on("download", (bytes) => {
                logger.debug(`Torrent: ${magnetURI}`);

                const {
                    downloaded,
                    downloadSpeed,
                    progress,
                    timeRemaining,
                    infoHash,
                } = torrent;

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

                torrentMap.set(torrent.name, { _progress, _downloadSpeed });

                const obj = {
                    torrent: infoHash,
                    progress: _progress,
                };
                const msg = JSON.stringify(obj, null, 2);

                process.env.SEND_MESSAGE !== "0" &&
                    sendMessage("torrent-queue", msg);

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
