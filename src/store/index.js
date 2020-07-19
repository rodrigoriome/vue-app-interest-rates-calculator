import Vue from "vue";
import Vuex from "vuex";
import i18n from "../plugins/i18n";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        locale: i18n.locale,
    },

    mutations: {
        setLocale(state, locale) {
            state.locale = locale;
            i18n.locale = locale;
        },
    },
});

export default store;
