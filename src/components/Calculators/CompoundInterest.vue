<template>
    <div class="grid grid-cols-2 col-gap-16 p-16">
        <div>
            <div class="mb-12">
                <FormLabel>{{ $t("compoundInterest.form.initial") }}</FormLabel>
                <FormGroup>
                    <span slot="prepend">R$</span>
                    <FormInput v-model="initialDeposit" @input="calculate" />
                </FormGroup>
            </div>

            <div class="mb-12">
                <FormLabel>{{ $t("compoundInterest.form.monthly") }}</FormLabel>
                <FormGroup>
                    <span slot="prepend">R$</span>
                    <FormInput v-model="monthlyDeposit" @input="calculate" />
                </FormGroup>
            </div>

            <div class="mb-12">
                <FormLabel>{{ $t("compoundInterest.form.rate") }}</FormLabel>
                <FormGroup>
                    <span slot="prepend">%</span>
                    <FormInput v-model="interestRate" @input="calculate" />
                    <FormSelect
                        v-model="interestFrequency"
                        class="border-l border-gray-300 text-gray-500"
                        :options="[
                            { value: 'M', label: $t('frequency.month') },
                            { value: 'Y', label: $t('frequency.year') },
                        ]"
                        @input="calculate"
                    />
                </FormGroup>
            </div>

            <div class="mb-12">
                <FormLabel>{{ $t("compoundInterest.form.period") }}</FormLabel>
                <FormGroup>
                    <FormInput v-model="periodValue" class="flex-1" @input="calculate" />
                    <FormSelect
                        v-model="periodType"
                        class="border-l border-gray-300 text-gray-500"
                        :options="[
                            { value: 'M', label: $t('date.months') },
                            { value: 'Y', label: $t('date.years') },
                        ]"
                    />
                </FormGroup>
            </div>
        </div>
        <div>
            <div class="mt-12">
                <p>{{ $t("compoundInterest.result.balance") }}: {{ balanceResult }}</p>
                <p>{{ $t("compoundInterest.result.deposit") }}: {{ depositResult }}</p>
                <p>{{ $t("compoundInterest.result.interest") }}: {{ interestResult }}</p>
            </div>
            <div>
                <canvas ref="chartCanvas" height="1" width="3" />
            </div>
        </div>
    </div>
</template>

<script>
import currency from "currency.js";
import _ from "lodash";
import { Chart } from "chart.js";

import FormLabel from "../Form/Label";
import FormInput from "../Form/Input";
import FormSelect from "../Form/Select";
import FormGroup from "../Form/FormGroup";

const PeriodTypes = {
    MONTH: "M",
    YEAR: "Y",
};

const ChartInterval = {
    EVERY_1_MONTH: 1,
    EVERY_1_YEAR: 12,
    EVERY_10_YEARS: 120,
};

export default {
    components: {
        FormLabel,
        FormInput,
        FormSelect,
        FormGroup,
    },

    data() {
        return {
            initialDeposit: 10000,
            monthlyDeposit: 5000,
            interestRate: 7.6,
            interestFrequency: PeriodTypes.YEAR,
            periodValue: 10,
            periodType: PeriodTypes.YEAR,

            chartInstance: null,
            chartLabels: [],

            balanceResult: null,
            balanceDataset: {
                label: this.$t("compoundInterest.result.balance"),
                borderColor: "rgb(54, 179, 126)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                data: [],
            },
            depositResult: null,
            depositDataset: {
                label: this.$t("compoundInterest.result.deposit"),
                borderColor: "rgb(101, 84, 192)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                data: [],
            },
            interestResult: null,
            interestDataset: {
                label: this.$t("compoundInterest.result.interest"),
                borderColor: "rgb(255, 196, 0)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                data: [],
            },
        };
    },

    computed: {
        periodInMonths() {
            if (this.periodType === PeriodTypes.YEAR) {
                return this.periodValue * 12;
            }

            return this.periodValue;
        },

        monthlyRate() {
            let rate = this.interestRate;

            if (this.interestFrequency === PeriodTypes.YEAR) {
                rate = this.interestRate / 12;
            }

            return rate / 100;
        },

        shouldComponentUpdate() {
            return (
                this.initialDeposit && this.monthlyDeposit && this.interestRate && this.periodValue
            );
        },

        chartInterval() {
            if (this.periodInMonths > 48) {
                return ChartInterval.EVERY_1_YEAR;
            }

            return ChartInterval.EVERY_1_MONTH;
        },
    },

    mounted() {
        const ctx = this.$refs.chartCanvas.getContext("2d");

        this.chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        this.calculate();
    },

    methods: {
        calculate: _.debounce(function() {
            if (!this.shouldComponentUpdate) {
                return;
            }

            let totalMonths = this.periodInMonths;
            let totalBalance = currency(this.initialDeposit);
            let totalDeposit = currency(this.initialDeposit);
            let totalInterest = currency(0);

            let monthLabels = [0];
            let balanceDataset = [totalBalance.value];
            let depositDataset = [totalBalance.value];
            let interestDataset = [totalInterest.value];

            for (let i = 1, n = totalMonths; i <= n; i++) {
                totalBalance = totalBalance.add(this.monthlyDeposit).multiply(1 + this.monthlyRate);
                totalDeposit = totalDeposit.add(currency(this.monthlyDeposit));
                totalInterest = totalBalance.subtract(totalDeposit.value);

                if (i % this.chartInterval === 0) {
                    monthLabels.push(i);
                    balanceDataset.push(totalBalance.value);
                    depositDataset.push(totalDeposit.value);
                    interestDataset.push(totalInterest.value);
                }
            }

            this.chartLabels = monthLabels;

            this.balanceResult = totalBalance.value;
            this.balanceDataset.data = balanceDataset;

            this.depositResult = totalDeposit.value;
            this.depositDataset.data = depositDataset;

            this.interestResult = totalInterest.value;
            this.interestDataset.data = interestDataset;

            this.updateChart();
        }, 150),

        updateChart() {
            this.chartInstance.data.labels = this.chartLabels;

            this.chartInstance.data.datasets = [
                this.balanceDataset,
                this.depositDataset,
                this.interestDataset,
            ];

            this.chartInstance.update();
        },
    },
};
</script>
