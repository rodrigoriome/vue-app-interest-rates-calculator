<template>
    <div :class="[`[ ${customClasses} ]`, 'relative flex w-1/1 bg-white']">
        <div
            v-if="hasPrepend"
            class="absolute inset-y-0 left-0 flex items-center text-14"
            :class="[active ? 'text-primary' : 'text-gray-400']"
        >
            <slot name="prepend" />
        </div>
        <div class="flex w-1/1">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false,
        };
    },

    computed: {
        hasPrepend() {
            return !!this.$slots.prepend;
        },

        customClasses() {
            const list = ["form-group"];

            if (this.hasPrepend) {
                list.push("form-group--has-prepend");
            }

            return list.join(" ");
        },
    },

    mounted() {
        this.$on("focus", () => (this.active = true));
        this.$on("blur", () => (this.active = false));
    },
};
</script>

<style>
.form-group--has-prepend .form-input:first-child,
.form-group--has-prepend .form-select:first-child {
    @apply pl-24;
}
</style>
