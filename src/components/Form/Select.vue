<template>
    <select
        :value="value"
        class="[ form-select ] relative block bg-transparent h-48 pl-16 pr-32 font-base border-b outline-none"
        :class="[
            active
                ? 'text-gray-800 border-primary'
                : 'text-gray-600 border-gray-300 hover:border-gray-400',
        ]"
        @input="$emit('input', $event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <option
            v-for="(opt, idx) in options"
            :key="idx"
            :value="opt.value"
            :selected="opt.selected"
            v-text="opt.label"
        />
    </select>
</template>

<script>
export default {
    props: {
        value: String,
        options: Array,
    },

    data() {
        return {
            active: false,
        };
    },

    methods: {
        handleFocus() {
            this.active = true;
            this.$parent.$emit("focus");
        },

        handleBlur() {
            this.active = false;
            this.$parent.$emit("blur");
        },
    },
};
</script>

<style>
.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239fa6b2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
}
</style>
