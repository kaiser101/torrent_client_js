import getOpts from '../opts.js';

test('getOpts is an array of announce urls', () => {
    expect(getOpts().tracker.announce).toEqual(
        expect.arrayContaining(['udp://open.stealth.si:80/announce'])
    );
    expect(getOpts().tracker.announce.length).toEqual(109);
});
