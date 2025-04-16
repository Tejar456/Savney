<template>
  <div class="p-5 md:p-10 h-full">
    <h1
      v-if="!showResult"
      class="text-center text-3xl font-semibold my-4 text-primary"
    >
      Investment Calculator
    </h1>
    <div v-if="!showResult">
      <form class="w-full px-10" @submit.prevent="calculateInvestment">
        <div class="mb-6">
          <label
            for="invest"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Invest</label
          >
          <input
            v-model.number="investAmount"
            type="number"
            id="invest"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="return"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Return Per Month (%)</label
          >
          <input
            v-model.number="returnRate"
            type="number"
            id="return"
            max="100"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="datepicker-custom"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Invesment Until Date</label
          >
          <input
            v-model="selectedDate"
            id="datepicker-custom"
            type="date"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Select date"
          />
        </div>

        <button
          type="submit"
          class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
        >
          Calculate Investment
        </button>
      </form>
    </div>

    <div v-else class="bg-white w-full h-full rounded-lg p-6 drop-shadow-lg">
      <h2 class="font-semibold text-2xl mb-5 text-primary">
        Investment Summary
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-gray-700">
        <div class="bg-gray-50 p-4 rounded-lg shadow">
          <p class="font-semibold">
            Invested Amount: Rp {{ formatCurrency(investAmount) }}
          </p>
          <p class="font-semibold">Return Rate per Month: {{ returnRate }}%</p>
          <p class="font-semibold">Start Date: {{ formatDate(today) }}</p>
          <p class="font-semibold">
            Investment Until: {{ formatDate(selectedDate) }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow">
          <p class="font-semibold">
            Investment Duration: {{ totalMonths }} months
          </p>
          <p class="font-semibold">
            Total Return: Rp {{ formatCurrency(totalReturn) }}
          </p>
          <p class="font-semibold">
            Total After Return: Rp {{ formatCurrency(totalAmount) }}
          </p>
          <p class="font-semibold">
            Return Percentage: {{ calculateReturnPercentage() }}%
          </p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="py-3 px-4">Month</th>
              <th scope="col" class="py-3 px-4">Date</th>
              <th scope="col" class="py-3 px-4">Beginning Balance</th>
              <th scope="col" class="py-3 px-4">Monthly Return</th>
              <th scope="col" class="py-3 px-4">Ending Balance</th>
              <th scope="col" class="py-3 px-4">Cumulative Return</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(month, index) in monthlyData"
              :key="index"
              class="bg-white border-b hover:bg-gray-50"
            >
              <td class="py-4 px-4">{{ month.month }}</td>
              <td class="py-4 px-4">{{ month.date }}</td>
              <td class="py-4 px-4">
                Rp {{ formatCurrency(month.beginBalance) }}
              </td>
              <td class="py-4 px-4">
                Rp {{ formatCurrency(month.monthlyReturn) }}
              </td>
              <td class="py-4 px-4">
                Rp {{ formatCurrency(month.endBalance) }}
              </td>
              <td class="py-4 px-4">
                Rp {{ formatCurrency(month.cumulativeReturn) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        @click="resetCalculator"
        class="w-full text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-3 mt-5"
      >
        Calculate Again
      </button>
    </div>
  </div>
  <div class="mb-26 md:mb-0"></div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
import { usePush } from "notivue";

const push = usePush();
const investAmount = ref();
const returnRate = ref();
const selectedDate = ref("");
const totalReturn = ref(0);
const totalAmount = ref(0);
const totalMonths = ref(0);
const showResult = ref(false);
const monthlyData = ref([]);

const today = new Date().toISOString().split("T")[0];

const calculateInvestment = () => {
  if (!selectedDate.value) {
    push.warning("Please select an investment end date!");
    return;
  }

  const endDate = new Date(selectedDate.value);
  const startDate = new Date();

  const diffInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (diffInMonths < 0) {
    push.warning("The date must be after today!");
    return;
  }

  totalMonths.value = diffInMonths;

  const monthlyReturnRate = returnRate.value / 100;
  let currentAmount = Number(investAmount.value);

  monthlyData.value = [];
  let cumulativeReturn = 0;

  for (let i = 0; i < diffInMonths; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i + 1);

    const beginBalance = currentAmount;
    const monthlyReturnAmount = beginBalance * monthlyReturnRate;
    currentAmount += monthlyReturnAmount;
    cumulativeReturn += monthlyReturnAmount;

    monthlyData.value.push({
      month: i + 1,
      date: formatDate(currentDate.toISOString().split("T")[0]),
      beginBalance: beginBalance.toFixed(2),
      monthlyReturn: monthlyReturnAmount.toFixed(2),
      endBalance: currentAmount.toFixed(2),
      cumulativeReturn: cumulativeReturn.toFixed(2),
    });
  }

  totalReturn.value = (currentAmount - investAmount.value).toFixed(2);
  totalAmount.value = currentAmount.toFixed(2);

  showResult.value = true;
};

const resetCalculator = () => {
  investAmount.value = 0;
  returnRate.value = 0;
  selectedDate.value = "";
  totalReturn.value = 0;
  totalAmount.value = 0;
  totalMonths.value = 0;
  monthlyData.value = [];
  showResult.value = false;
};

const formatCurrency = (value) => {
  return Number(value).toLocaleString("id-ID");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateReturnPercentage = () => {
  if (!investAmount.value || !totalReturn.value) return 0;
  return ((totalReturn.value / investAmount.value) * 100).toFixed(2);
};

import { onMounted } from "vue";
import { useFlowbite } from "~/composables/useFlowbite";

onMounted(() => {
  const style = document.createElement("style");
  style.textContent = `
    .datepicker-picker .datepicker-cell.selected, 
    .datepicker-picker .datepicker-cell.selected:hover {
      background-color: rgba(17, 139, 80, 1) !important;
      color: white !important;
    }
    .datepicker-picker .datepicker-header .datepicker-controls .button {
      background-color: rgba(17, 139, 80, 1) !important;
      color: white !important;
    }
    .datepicker-picker .datepicker-footer .datepicker-controls .button {
      background-color: rgba(17, 139, 80, 1) !important;
      color: white !important;
    }  
  `;
  document.head.appendChild(style);

  useFlowbite((flowbite) => {
    const $datepickerEl = document.getElementById("datepicker-custom");

    if (!$datepickerEl) return;

    const options = {
      defaultDatepickerId: null,
      autohide: true,
      format: "yyyy-mm-dd",
      maxDate: null,
      minDate: today,
      orientation: "bottom",
      buttons: true,
      autoSelectToday: false,
      title: null,
      language: "en",
      rangePicker: false,
      onSelect: (selectedDates, dateStr) => {
        selectedDate.value = dateStr;
      },
    };

    const instanceOptions = {
      id: "datepicker-custom-example",
      override: true,
    };

    const datepicker = new Datepicker($datepickerEl, options, instanceOptions);

    $datepickerEl.addEventListener("changeDate", (e) => {
      const date = e.detail.datepicker.getDate();
      const formattedDate = date.toISOString().split("T")[0];
      selectedDate.value = formattedDate;
    });

    $datepickerEl.addEventListener("change", (e) => {
      selectedDate.value = e.target.value;
    });
  });
});
</script>


