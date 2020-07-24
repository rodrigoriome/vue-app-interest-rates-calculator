<template>
    <div class="lg:flex w-1/1 lg:rounded-16 shadow-lg" style="max-width: 1200px;">
        <div class="p-16 lg:p-64 lg:rounded-l-16 flex-none">
            <div class="mb-32">
                <FormLabel for="initial_deposit">
                    {{ $t("compoundInterest.form.initial") }}
                </FormLabel>
                <FormGroup>
                    <span slot="prepend">
                        <IconCash />
                    </span>
                    <FormInput
                        class="w-1/1"
                        id="initial_deposit"
                        v-model="initialDeposit"
                        format="currency"
                        @input="calculate"
                    />
                </FormGroup>
            </div>

            <div class="mb-32">
                <FormLabel for="monthly_deposit">
                    {{ $t("compoundInterest.form.monthly") }}
                </FormLabel>
                <FormGroup>
                    <span slot="prepend">
                        <IconCash />
                    </span>
                    <FormInput
                        class="w-1/1"
                        id="monthly_deposit"
                        v-model="monthlyDeposit"
                        format="currency"
                        @input="calculate"
                    />
                </FormGroup>
            </div>

            <div class="mb-32">
                <FormLabel for="interest_frequency">
                    {{ $t("compoundInterest.form.rate") }}
                </FormLabel>
                <FormGroup>
                    <span slot="prepend">
                        <IconPercent />
                    </span>
                    <FormInput
                        id="interest_frequency"
                        class="w-1/1"
                        format="percent"
                        v-model="interestRate"
                        @input="calculate"
                    />
                    <FormSelect
                        v-model="interestFrequency"
                        :options="[
                            { value: 'M', label: $t('frequency.month') },
                            { value: 'Y', label: $t('frequency.year') },
                        ]"
                        @input="calculate"
                    />
                </FormGroup>
            </div>

            <div class="mb-32">
                <FormLabel for="period">{{ $t("compoundInterest.form.period") }}</FormLabel>
                <FormGroup>
                    <span slot="prepend">
                        <IconCalendar />
                    </span>
                    <FormInput id="period" v-model="periodValue" class="w-1/1" @input="calculate" />
                    <FormSelect
                        v-model="periodType"
                        :options="[
                            { value: 'M', label: $t('date.months') },
                            { value: 'Y', label: $t('date.years') },
                        ]"
                        @input="calculate"
                    />
                </FormGroup>
            </div>
            <LocaleSwitcher />
        </div>
        <div class="[ result ] p-16 lg:p-64 text-white flex-1 lg:rounded-r-16 overflow-auto">
            <p class="lg:text-24">{{ $t("compoundInterest.result.balance") }}</p>
            <p class="lg:text-64 text-blue font-black mb-12 truncate">
                <span>{{ $t("currency.symbol") }} {{ balanceResult | currency }}</span>
            </p>
            <hr class="opacity-25 mb-32" />
            <p class="lg:text-24 opacity-50 mb-12">
                {{ $t("compoundInterest.result.deposit") }}: {{ $t("currency.symbol") }}
                {{ depositResult | currency }}
            </p>
            <p class="lg:text-24 opacity-50 mb-32">
                {{ $t("compoundInterest.result.interest") }}: {{ $t("currency.symbol") }}
                {{ interestResult | currency }}
            </p>
            <div>
                <canvas ref="chartCanvas" height="1" width="3" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import currency from "currency.js";
import _ from "lodash";
import { Chart } from "chart.js";

import FormLabel from "../Form/Label";
import FormInput from "../Form/Input";
import FormSelect from "../Form/Select";
import FormGroup from "../Form/FormGroup";
import LocaleSwitcher from "../LocaleSwitcher";

import IconCash from "../../icons/Cash";
import IconCalendar from "../../icons/Calendar";
import IconPercent from "../../icons/Percent";

import CurrencyFilter from "../../filters/Currency";

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
        IconCash,
        IconCalendar,
        IconPercent,
        LocaleSwitcher,
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

    filters: {
        currency: CurrencyFilter,
    },

    computed: {
        ...mapState(["locale"]),

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
        const opaqueWhite = "rgba(255, 255, 255, 0.5)";

        this.chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                legend: {
                    labels: { fontColor: opaqueWhite },
                },
                scales: {
                    xAxes: [
                        {
                            ticks: { fontColor: opaqueWhite },
                            gridLines: { color: opaqueWhite },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontColor: opaqueWhite,
                            },
                            gridLines: { color: opaqueWhite },
                        },
                    ],
                },
            },
        });

        this.calculate();
    },

    watch: {
        locale() {
            this.balanceDataset.label = this.$t("compoundInterest.result.balance");
            this.depositDataset.label = this.$t("compoundInterest.result.deposit");
            this.interestDataset.label = this.$t("compoundInterest.result.interest");
            this.updateChart();
        },
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

<style scoped>
.result {
    background-image: linear-gradient(theme("colors.blue.dark"), theme("colors.blue.darker"));
}
</style>
