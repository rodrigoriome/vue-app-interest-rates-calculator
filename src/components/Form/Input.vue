<template>
    <input
        :value="value"
        type="text"
        class="[ form-input ] relative block bg-transparent h-48 px-10 border outline-none"
        :class="[
            active
                ? 'text-blue-dark border-blue shadow-input z-10'
                : 'text-gray-700 border-gray-300 hover:border-gray-500 hover:z-10',
        ]"
        @input="$emit('input', $event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
    />
</template>

<script>
export default {
    props: {
        value: [String, Number],
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
