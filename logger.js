import dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();

log4js.configure({
    appenders: {
        torrent: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd',
            keepFileExt: true, //
            maxLogSize: 1024 * 1024 * 10, //1024 * 1024 * 1 = 1M
            backups: 2, //
            alwaysIncludePattern: true, //
            numBackups: 3, //
            filename: 'torrent.log',
        },
    },
    categories: {
        default: { appenders: ['torrent'], level: process.env.LEVEL },
    },
});
const logger = log4js.getLogger('torrent');

export default logger;
