<template>
  <div
    class="h-full w-full flex flex-col items-center gap-5 mb-20 lg:mb-0 p-5 md:p-10"
  >
    <div
      class="relative h-40 w-full rounded-xl drop-shadow-lg text-white flex justify-between items-center px-5 overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593672755342-741a7f868732?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5fGVufDB8fDB8fHww')] bg-cover bg-center brightness-50"
      ></div>

      <!-- Content -->
      <div class="z-10">
        <p class="text-lg">Balance</p>
        <p class="font-semibold text-xl">Rp.4.800.000</p>
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
        <Piechart />
      </div>
      <div
        class="col-span-1 md:col-span-2 bg-white w-full h-full rounded-xl p-5 drop-shadow-lg"
      >
        <Linechart />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>
