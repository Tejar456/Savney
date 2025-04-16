<template>
  <div class="h-full w-full flex flex-col items-center gap-10 p-5 md:p-10">
    <div
      class="bg-white w-full h-full rounded-xl p-5 mb-26 drop-shadow-lg text-primary"
    >
      <h2 class="font-semibold text-lg mb-5">Transaction history</h2>
      <div
        v-for="(transaction, index) in transactions"
        :key="index"
        class="grid grid-cols-7 md:grid-cols-12"
      >
        <div class="col-span-1">
          <svg
            v-if="transaction.type === 'income'"
            class="w-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g opacity="0.4">
                <path
                  d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
                  stroke="#118b50"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12 7.5V16.5"
                  stroke="#118b50"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
              <path
                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17 3V7H21"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M22 2L17 7"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <svg
            v-if="transaction.type === 'expense'"
            class="w-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g opacity="0.4">
                <path
                  d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
                  stroke="#118b50"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12 7.5V16.5"
                  stroke="#118b50"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
              <path
                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M22 6V2H18"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17 7L22 2"
                stroke="#118b50"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div class="col-span-3 md:col-span-6 ml-5 md:-ml-5 colspan text-left">
          <p class="text-sm font-medium">{{ transaction.description }}</p>
          <p class="text-sm">{{ transaction.date }}</p>
        </div>
        <div class="col-span-3 md:col-span-5 text-right">
          <p
            v-if="transaction.type === 'income'"
            class="text-sm font-medium text-primary"
          >
            {{ transaction.amount.toLocaleString() }}
          </p>
          <p
            v-if="transaction.type === 'expense'"
            class="text-sm font-medium text-primary"
          >
            -{{ transaction.amount.toLocaleString() }}
          </p>
          <p class="text-sm">{{ transaction.type }}</p>
        </div>
        <hr
          v-if="index !== transactions.length - 1"
          class="col-span-7 md:col-span-12 h-px my-3 w-full border-gray-300 border-1"
        />
      </div>
    </div>
    
    <NuxtLink to="/add?source=expense">
      <button
        class="bg-primary text-white py-2 px-3 rounded-lg fixed bottom-25 right-10 lg:bottom-10 lg:right-10"
      >
        + Add
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const transactions = ref([]);
const loading = ref(true);
const error = ref(null);
const { getToken } = useAuth();

const getTransaction = async () => {
  try {
    loading.value = true;
    error.value = null;
    const token = getToken();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions (${response.status})`);
    }

    const data = await response.json();
    transactions.value = data;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    error.value = "Failed to load transactions";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getTransaction();
});
</script>
