import Vue from "vue";
import VueI18n from "vue-i18n";

import en_US from "../locale/en-us";
import pt_BR from "../locale/pt-br";

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "pt_BR",
    messages: { en_US, pt_BR },
});

export default i18n;
