<template>
    <div class="[ form-group ] relative flex bg-white border border-gray-300 shadow-sm">
        <div
            v-if="hasPrepend"
            class="flex items-center bg-blue text-white justify-center text-14 w-10"
        >
            <slot name="prepend" />
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    computed: {
        hasPrepend() {
            return !!this.$slots.prepend;
        },
    },
};
</script>

<style>
.form-group .form-input {
    @apply flex-1;
}
</style>
