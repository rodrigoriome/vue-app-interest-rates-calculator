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
import CurrencyFormatter from "../../helpers/Formatters/CurrencyFormatter";
import PercentFormatter from "../../helpers/Formatters/PercentFormatter";

export default {
    props: {
        value: [String, Number],
        format: [String],
    },

    data() {
        return {
            active: false,
            formattedValue: "",
        };
    },

    computed: {
        formatter() {
            switch (this.format) {
                case "currency":
                    return CurrencyFormatter;

                case "percent":
                    return PercentFormatter;
            }

            return null;
        },
    },

    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                if (!this.formatter) {
                    this.formattedValue = newValue || "";

                    return;
                }

                const formatted = this.formatter.format(newValue);

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
            this.$emit(
                "input",
                this.money ? CurrencyFormatter.unformat(event.target.value) : event.target.value,
            );
        },
    },
};
</script>
