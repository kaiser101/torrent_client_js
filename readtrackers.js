import fs from 'fs';
import logger from './logger.js';

const readTrackersSync = () => {
  const data = fs.readFileSync(
    'E:/Administrator/Downloads/Code samples/Node/trackerslist/trackers_all.txt',
    { encoding: 'utf8', flag: 'r' }
  );

  const trackers = data.split(/\r\n\r\n/);

  logger.info('trackers', trackers);

  return trackers;
};

export default readTrackersSync;
