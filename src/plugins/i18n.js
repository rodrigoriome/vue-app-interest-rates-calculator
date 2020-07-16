import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "../locale/en";
import pt from "../locale/pt";

Vue.use(VueI18n);

export default new VueI18n({
    locale: "pt",
    messages: { en, pt },
});
