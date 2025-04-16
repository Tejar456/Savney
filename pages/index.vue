<template>
  <div
    class="h-full w-full flex flex-col items-center gap-5 mb-20 lg:mb-0 p-5 md:p-10"
  >
    <div
      class="relative h-40 w-full rounded-xl drop-shadow-lg text-white flex justify-between items-center px-5 overflow-hidden"
    >
      <div class="absolute inset-0 bg-primary bg-cover bg-center"></div>
      <div class="z-10">
        <p class="text-lg">Balance</p>
        <p class="font-semibold text-2xl">
          Rp.{{
            typeof dashboard.balance === "number"
              ? dashboard.balance.toLocaleString()
              : "0"
          }}
        </p>
      </div>
      
      <div class="z-10 flex items-center justify-center flex-col gap-1">
        <NuxtLink to="/add?source=income">
          <div class="w-10 bg-transparent border-1 border-white rounded-sm p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              wa
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </NuxtLink>
        <p>Add Balances</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
      <div
        class="col-span-1 bg-white w-full h-full rounded-xl p-5 drop-shadow-lg"
      >
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-primary">Expense</h1>
            <p class="text-lg text-gray-500">In 30 days</p>
            <h2 class="text-xl font-semibold text-primary">
              Rp.{{
                typeof dashboard.expense === "number"
                  ? dashboard.expense.toLocaleString()
                  : "0"
              }}
            </h2>
          </div>
          <Piechart />
        </div>
      </div>
      <div
        class="col-span-1 md:col-span-2 bg-white w-full h-full rounded-xl p-5 drop-shadow-lg"
      >
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-primary">Income</h1>
            <p class="text-lg text-gray-500">In This Year</p>
            <h2 class="text-xl font-semibold text-primary">
              Rp.{{
                typeof dashboard.income === "number"
                  ? dashboard.income.toLocaleString()
                  : "0"
              }}
            </h2>
          </div>
          <Linechart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const dashboard = ref({
  balance: 0,
  income: 0,
  expense: 0,
});

const { getToken } = useAuth();

const getDashboard = async () => {
  try {
    const token = getToken();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard (${response.status})`);
    }

    const data = await response.json();

    dashboard.value = {
      balance: Number(data.balance) || 0,
      income: Number(data.income) || 0,
      expense: Number(data.expense) || 0,
    };
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    error.value = "Failed to load dashboard";
  }
};

onMounted(() => {
  getDashboard();
});
</script>
