module.exports = {
    bytesToMb: (x) => x / 1048576,

    decToPerc: (x) => x * 100,

    formatDecimal: (x) =>
        x.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
            maximumFractionDigits: 2,
        }),

    msToSec: (x) => x / 60000,
};
