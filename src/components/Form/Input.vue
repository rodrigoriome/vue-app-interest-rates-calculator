<template>
    <input
        type="text"
        class="[ form-input ] relative block bg-transparent h-48 px-10 border outline-none"
        :value="formattedValue"
        :class="[
            active
                ? 'text-blue-dark border-blue shadow-input z-10'
                : 'text-gray-700 border-gray-300 hover:border-gray-500 hover:z-10',
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
    />
</template>

<script>
import { format, unformat } from "../../helpers/Currency";

export default {
    props: {
        value: [String, Number],
        money: Boolean,
    },

    data() {
        return {
            active: false,
            formattedValue: "",
        };
    },

    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                if (!this.money) {
                    this.formattedValue = newValue || "";

                    return;
                }

                const formatted = format(newValue);

                if (formatted !== this.formattedValue) {
                    this.formattedValue = formatted;
                }
            },
        },
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

        handleInput(event) {
            this.$emit("input", this.money ? unformat(event.target.value) : event.target.value);
        },
    },
};
</script>
