<template>
  <div class="mt-5">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, onMounted } from "vue";

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "expense",
      data: [],
      backgroundColor: [
        "rgb(17,139,80)",
        "rgb(12,115,65)",
        "rgb(22,163,94)",
        "rgb(34,197,94)",
        "rgb(74,222,128)",
        "rgb(134,239,172)",
      ],
      hoverOffset: 4,
    },
  ],
});

const { getToken } = useAuth();

onMounted(async () => {
  try {
    const token = getToken();
    const configenv = useRuntimeConfig();
    const apiBaseUrl = configenv.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const categoryTotals = data
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => {
        const category = transaction.category || "Other";
        const cleanAmount = transaction.amount.toString().replace(/[^\d]/g, "");
        const amount = parseInt(cleanAmount, 10);

        if (!isNaN(amount)) {
          acc[category] = (acc[category] || 0) + amount;
        }
        return acc;
      }, {});
    

    chartData.value.labels = Object.keys(categoryTotals);
    chartData.value.datasets[0].data = Object.values(categoryTotals);

    const config = {
      type: "pie",
      data: chartData.value,
      options: {
        responsive: true,
        plugins: {          
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                return `${context.label}: ${new Intl.NumberFormat("id-ID", {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)}`;
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            displayColors: false
          },
          legend: {
            position: "top",
          },
        },
      },
    };

    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }

    const myChart = new Chart(document.getElementById("myChart"), config);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
});
</script>
