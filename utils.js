const bytesToMb = (x) => x / 1048576;

const decToPerc = (x) => x * 100;

const formatDecimal = (x) =>
    x.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
        maximumFractionDigits: 2,
    });

const msToMins = (x) => x / 60000;

export { bytesToMb, decToPerc, formatDecimal, msToMins };
