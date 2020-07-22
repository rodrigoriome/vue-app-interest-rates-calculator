import { format } from "../helpers/Formatters/CurrencyFormatter";

const CurrencyFilter = value => format(value || 0);

export default CurrencyFilter;
