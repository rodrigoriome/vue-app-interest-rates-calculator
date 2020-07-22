import { fixed, extractNumbers, formatDecimals, unformatNumber } from "../NumbersUtil";

const precision = 2;

export const format = input => {
    if (typeof input === "number") {
        input = input.toFixed(fixed(precision));
    }

    return formatDecimals(extractNumbers(input), precision);
};

export const unformat = input => unformatNumber(input, precision);

export default { format, unformat };
