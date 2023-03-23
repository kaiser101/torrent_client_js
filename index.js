import dotenv from 'dotenv';
import WebTorrent from 'webtorrent';
import getOpts from './opts.js';
import readLine from 'readline';
import fs from 'fs';
import logger from './logger.js';
import { bytesToMb, decToPerc, formatDecimal, msToMins } from './utils.js';
import _ from 'lodash';
import sendMessage from './sendMessage.js';
import moment from 'moment';

const { map, zipWith, isEmpty } = _;

dotenv.config();

let checkAllLines = false;

const toggleTorrents = () => {
    logger.info('Read all torrents');
    checkAllLines = true;
};

const client = new WebTorrent({
    utp: true,
});

const doneOp = (client, magnetURI, torrent, start) => () => {
    logger.info(`Torrent ${torrent.name} download finished`);

    const end = moment();
    const durn = moment.duration(end.diff(start)).as('minutes');
    logger.info(`Torrent finished in ${formatDecimal(durn)} minutes`);

    client.remove(magnetURI, (err) => {
        logger.warn(err ?? 'Torrent removed');
    });

    if (checkAllLines && isEmpty(client.torrents)) {
        client.destroy((err) => {
            logger.warn(err ?? 'Torrent client killed');
        });
    }
};

const downloadOp = (torrent) => (bytes) => {
    const { downloaded, downloadSpeed, progress, timeRemaining, infoHash } =
        torrent;

    const [_downloaded, _downloadSpeed, _progress, _timeRemaining] = map(
        zipWith(
            [bytesToMb, bytesToMb, decToPerc, msToMins],
            [downloaded, downloadSpeed, progress, timeRemaining],
            (x, y) => x(y)
        ),
        formatDecimal
    );

    const obj = {
        torrent: infoHash,
        progress: _progress,
    };
    const msg = JSON.stringify(obj, null, 2);

    process.env.SEND_MESSAGE !== '0' && sendMessage('torrent-queue', msg);

    const torrentObj = {
        infoHash,
        downloaded: _downloaded,
        downloadSpeed: _downloadSpeed,
        progress: _progress,
        timeRemaining: _timeRemaining,
    };

    logger.debug(JSON.stringify(torrentObj, null, 2));
};

const torrentOps = (magnetURI) => (torrent) => {
    const start = moment();
    logger.info(`Name ${torrent.name}`);

    if (
        process.env.IGNORE_LARGE_TORRENTS === 'true' &&
        torrent.length > 3 * 1024 ** 3
    ) {
        client.remove(magnetURI, (err) => {
            logger.warn(err ?? 'Torrent very large, removed!');
        });
    }

    torrent.on('done', doneOp(client, magnetURI, torrent, start));

    torrent.on('download', downloadOp(torrent));
};

const downloadTorrent = (magnetURI) => {
    client.add(
        magnetURI,
        {
            announce: getOpts().tracker.announce,
            path: './torrents',
        },
        torrentOps(magnetURI)
    );
};

const readFile = () => {
    let lineReader = readLine.createInterface({
        input: fs.createReadStream('torrents.txt'),
    });

    lineReader.on('line', downloadTorrent).on('close', toggleTorrents);
};

readFile();
