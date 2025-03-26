<template>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-primary">Income</h1>
        <p class="text-lg text-gray-500">In 30 days</p>
        <h2 class="text-xl font-semibold text-primary">Rp.50.000</h2>
      </div>
      <canvas id="myLineChart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from "vue";
  import Chart from "chart.js/auto";
  
  let chartInstance = null; // Store the Chart instance
  
  // Function to generate date labels for the last `count` days
  const generateDateLabels = (count) => {
    const dates = [];
    const today = new Date();
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
    return dates;
  };
  
  const labels = generateDateLabels(7); // Generate labels for the last 7 days
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
  };
  
  onMounted(() => {
    const ctx = document.getElementById("myLineChart").getContext("2d");
    chartInstance = new Chart(ctx, config); // Create the Chart instance
  });
  
  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the Chart instance before unmounting
    }
  });
  </script>