<template>
  <div class="h-full w-full flex flex-col items-center gap-10 px-10 py-5">
    <div
      class="bg-white w-full h-1/2 rounded-xl p-5 drop-shadow-lg text-primary"
    >
      <h2 class="font-semibold text-lg mb-5">Transaction history</h2>
      <div
        v-for="(transaction, index) in transactions"
        :key="index"
        class="grid grid-cols-7 md:grid-cols-12"
      >
        <div class="col-span-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div class="col-span-3 md:col-span-6 colspan text-left">
          <p class="text-sm font-medium">{{ transaction.name }}</p>
          <p class="text-sm">{{ transaction.date }}</p>
        </div>
        <div class="col-span-3 md:col-span-5 text-right">
          <p class="text-sm font-medium">
            Rp.{{ transaction.amount.toLocaleString() }}
          </p>
          <p class="text-sm">{{ transaction.type }}</p>
        </div>
        <hr
          v-if="index !== transactions.length - 1"
          class="col-span-7 md:col-span-12 h-px my-3 w-full border-gray-300 border-1"
        />
      </div>
    </div>
    <NuxtLink to="/add">
      <button
        class="bg-primary text-white py-2 px-3 rounded-lg fixed bottom-25 right-10"
      >
        + Add
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
const transactions = ref([]);
const getTransaction = async () => {
  try {
    const response = await fetch('http://localhost:4000/transactions');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();    
    transactions.value = data; // Store the fetched data in transactions ref
    console.log(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

onMounted(() => {
  getTransaction()
})
</script>