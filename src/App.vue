<template>
    <div class="flex items-center justify-center h-1/1">
        <CompoundInterestCalculator />
    </div>
</template>

<script>
import CompoundInterestCalculator from "./components/Calculators/CompoundInterest.vue";

export default {
    components: {
        CompoundInterestCalculator,
    },
};
</script>
