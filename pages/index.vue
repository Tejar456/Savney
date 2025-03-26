<template>
  <div class="flex items-center gap-3 px-10 py-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke="currentColor"
      class="size-12"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
    <p>Username</p>
  </div>
  <div class="h-full w-full flex flex-col items-center gap-5 px-10 mb-26">
    <div
      class="relative h-40 w-full rounded-xl drop-shadow-lg text-white flex justify-between items-center px-5 overflow-hidden"
    >
      <!-- Background with brightness filter -->
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593672755342-741a7f868732?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5fGVufDB8fDB8fHww')] bg-cover bg-center brightness-50"
      ></div>

      <!-- Content -->
      <div class="z-10">
        <p class="text-lg">Balance</p>
        <p class="font-semibold text-xl">Rp.4.800.000</p>
      </div>
      <div class="z-10 flex items-center justify-center flex-col gap-1">
        <div class="w-10 bg-transparent border-1 border-white rounded-sm p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
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

