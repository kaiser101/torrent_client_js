const { bytesToMb, decToPerc, formatDecimal } = require("../utils");

describe("Test utils module", () => {
    test("Converts bytes to megabytes", () => {
        expect(bytesToMb(1048576)).toEqual(1);
    });

    test("2 MB in bytes should be equals to 2 MB", () => {
        expect(bytesToMb(2097152)).toEqual(2);
    });

    test("Number to percentage", () => {
        expect(decToPerc(0.99)).toEqual(99);
    });

    test("Fractional number to percentage", () => {
        expect(decToPerc(0.7725)).toEqual(77.25);
    });

    test("Number formatting", () => {
        expect(formatDecimal(0.7725)).toEqual("00.77");
    });

    test("Milliseconds to seconds", () => {
        expect(formatDecimal(60000)).toEqual(1);
    });

    test("120000 Milliseconds to seconds", () => {
        expect(formatDecimal(120000)).toEqual(2);
    });
});
