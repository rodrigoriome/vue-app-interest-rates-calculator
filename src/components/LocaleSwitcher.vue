<template>
    <div class="flex items-center">
        <div class="text-gray-800 mr-16">
            <IconTranslation />
        </div>
        <div
            v-for="(locale, idx) in availableLocales"
            :class="[
                'cursor-pointer text-14 font-medium leading-none mr-8',
                locale === currentLocale ? 'text-gray-800' : 'text-gray-400',
            ]"
            :key="idx"
            @click="setLocale(locale)"
        >
            {{ locale | localeLabel }}
        </div>
    </div>
</template>

<script>
import IconTranslation from "../icons/Translation";
import i18n from "../plugins/i18n";

export default {
    components: {
        IconTranslation,
    },

    filters: {
        localeLabel: value => value.substring(0, 2).toUpperCase(),
    },

    computed: {
        currentLocale() {
            return i18n.locale;
        },

        availableLocales() {
            return Object.keys(i18n.messages);
        },
    },

    methods: {
        setLocale(locale) {
            this.$store.commit("setLocale", locale);
        },
    },
};
</script>
