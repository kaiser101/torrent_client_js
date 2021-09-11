const opts = require("../opts");

test("opts is an array of announce urls", () => {
    expect(opts.getOpts().tracker.announce).toEqual(
        expect.arrayContaining(["udp://tc.animereactor.ru:8082/announce"])
    );
    expect(opts.getOpts().tracker.announce.length).toEqual(134);
});
