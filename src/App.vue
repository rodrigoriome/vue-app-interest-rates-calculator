<template>
    <div>
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

<style>
input,
select {
    font-family: sans-serif;
}
</style>
