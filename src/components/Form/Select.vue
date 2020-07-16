<template>
    <select
        :value="value"
        class="[ form-select ] block pl-3 pr-10 py-2 bg-gray-100 hover:bg-gray-200 transition-color duration-200 text-base leading-6 sm:text-sm sm:leading-5"
        @input="$emit('input', $event.target.value)"
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
};
</script>

<style>
.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239fa6b2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
}
</style>
