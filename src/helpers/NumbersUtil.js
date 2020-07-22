export const toStr = value => (value ? value.toString() : "");
export const extractNumbers = value => +toStr(value).replace(/\D+/g, "") || 0;
export const between = (min, max, n) => Math.max(min, Math.min(n, max));
export const fixed = precision => between(0, 20, precision);

export const formatDecimals = (number, precision) => {
    let float = parseFloat(number) / Math.pow(10, precision);

    return float.toFixed(fixed(precision));
};

export const unformatNumber = (input, precision) => {
    let percent = formatDecimals(extractNumbers(input), precision);

    return parseFloat(percent);
};
