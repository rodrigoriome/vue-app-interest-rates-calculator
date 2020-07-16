<template>
    <input
        :value="value"
        type="text"
        class="[ form-input ] block py-2 px-3 sm:text-sm sm:leading-5"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script>
export default {
    props: {
        value: [String, Number],
    },
};
</script>
