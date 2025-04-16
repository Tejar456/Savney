<template>
  <div class="p-5 md:p-10 h-full">
    <h1 class="text-center text-3xl font-semibold my-4 text-primary">
      Auto Cut Balance
    </h1>
    <form @submit.prevent="submitAutoCut()" class="w-full px-10">
      <div class="mb-6">
        <label
          for="amount"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Amount</label
        >
        <input
          v-model="autoCut.amount"
          type="number"
          id="amount"
          required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description</label
        >
        <input
          v-model="autoCut.description"
          type="text"
          id="description"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="categories"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select a Category</label
        >
        <select
          v-model="autoCut.category"
          required
          id="categories"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        >
          <option value="" disabled selected>Select Categories</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="fashion">Fashion</option>
          <option value="invest">Invest</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="mb-6">
        <label
          for="datepicker-custom"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Date</label
        >
        <input
          v-model="autoCut.deduction_date"
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
        Add
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import { usePush } from "notivue";
const { getToken } = useAuth();

const push = usePush();
const router = useRouter();

const autoCut = ref({
  amount: "",
  description: "",
  category: "",
  deduction_date: "",
});

const submitAutoCut = async () => {
  try {
    const token = getToken();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/autoCuts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(autoCut.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create auto-cut");
    }

    push.success("Auto-cut created successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Error creating auto-cut:", error);
    push.error("Failed to creating auto cut!");
  }
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

    const options = {
      defaultDatepickerId: null,
      autohide: true,
      format: "yyyy-mm-dd",
      maxDate: null,
      minDate: null,
      orientation: "bottom",
      buttons: true,
      autoSelectToday: false,
      title: null,
      language: "en",
      rangePicker: false,
      onSelect: (selectedDates, dateStr) => {
        autoCut.value.deduction_date = dateStr;
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
      autoCut.value.deduction_date = formattedDate;
    });
  });
});
</script>
