import i18n from "../plugins/i18n";

const decimalSeparator = () => i18n.t("currency.decimal");
const thousandsSeparator = () => i18n.t("currency.thousands");
const precision = 2;

const format = inputValue => {
    if (typeof inputValue === "number") {
        inputValue = inputValue.toFixed(fixed(precision));
    }

    let negative = inputValue.indexOf("-") >= 0 ? "-" : "";
    let numbers = onlyNumbers(inputValue);
    let currency = numbersToCurrency(numbers, precision);
    let parts = toStr(currency).split(".");
    let integer = parts[0];
    let decimal = parts[1];

    integer = integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${thousandsSeparator()}`);

    return negative + joinIntegerAndDecimal(integer, decimal, decimalSeparator());
};

const unformat = input => {
    let negative = input.indexOf("-") >= 0 ? -1 : 1;
    let numbers = onlyNumbers(input);
    let currency = numbersToCurrency(numbers, precision);

    return parseFloat(currency) * negative;
};

const toStr = value => (value ? value.toString() : "");
const onlyNumbers = value => toStr(value).replace(/\D+/g, "") || "0";
const between = (min, max, n) => Math.max(min, Math.min(n, max));
const fixed = () => between(0, 20, precision);

const numbersToCurrency = (numbers, precision) => {
    let exp = Math.pow(10, precision);
    let float = parseFloat(numbers) / exp;

    return float.toFixed(fixed(precision));
};

const joinIntegerAndDecimal = (integer, decimal, separator) =>
    decimal ? integer + separator + decimal : integer;

export { format, unformat };
