import i18n from "../../plugins/i18n";

import { fixed, toStr, extractNumbers, formatDecimals, unformatNumber } from "../NumbersUtil";

const precision = 2;

const decimalSeparator = () => i18n.t("currency.decimal");

const thousandsSeparator = () => i18n.t("currency.thousands");

const addDecimalToCurrency = (integer, decimal, separator) => {
    return decimal ? integer + separator + decimal : integer;
};

export const format = input => {
    if (typeof input === "number") {
        input = input.toFixed(fixed(precision));
    }

    let currency = formatDecimals(extractNumbers(input), precision);
    let parts = toStr(currency).split(".");
    let integer = parts[0];
    let decimal = parts[1];

    integer = integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${thousandsSeparator()}`);

    return addDecimalToCurrency(integer, decimal, decimalSeparator());
};

export const unformat = input => unformatNumber(input, precision);

export default { format, unformat };
