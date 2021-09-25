const { bytesToMb, decToPerc, formatDecimal } = require("../utils");

describe("Test utils module", () => {
    test("Converts bytes to megabytes", () => {
        expect(bytesToMb(1048576)).toEqual(1);
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
});
