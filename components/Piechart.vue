<template>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-primary">Expense</h1>
        <p class="text-lg text-gray-500">In 30 days</p>
        <h2 class="text-xl font-semibold text-primary">Rp.50.000</h2>
      </div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script setup>
  import Chart from "chart.js/auto";
  
  const data = {
    labels: ["Food", "Transport", "Other"],
    datasets: [
      {
        label: "expense",
        data: [30000, 20000, 100000],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  
  const config = {
    type: "pie",
    data: data,
  };
  
  onMounted(() => {
    const myChart = new Chart(document.getElementById("myChart"), config);
  });
  </script>
  