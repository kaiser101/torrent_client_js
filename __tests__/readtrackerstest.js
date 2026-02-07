import readTrackersSync from '../readtrackers.js';
import fs from 'fs';
import { jest } from '@jest/globals';

test('readTrackersSync is an array of announce urls actual', () => {
  expect(readTrackersSync()).toEqual(
    expect.arrayContaining(['udp://explodie.org:6969/announce'])
  );
});

test('readTrackersSync is an array of announce urls mocked', () => {
  jest.spyOn(fs, 'readFileSync').mockImplementation(
    () =>
      `http://tracker-zhuqiy.dgj055.icu:80/announce\r\n\r\n
    http://t1.aag.moe:17715/announce\r\n\r\n`
  );
  expect(readTrackersSync()).toEqual(
    expect.arrayContaining(['http://tracker-zhuqiy.dgj055.icu:80/announce'])
  );
});
