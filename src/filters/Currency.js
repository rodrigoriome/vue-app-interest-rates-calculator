import { format } from "../helpers/Currency";

const CurrencyFilter = value => format(value || 0);

export default CurrencyFilter;
