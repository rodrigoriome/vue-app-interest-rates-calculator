<template>
    <div class="container mx-auto lg:py-64">
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
