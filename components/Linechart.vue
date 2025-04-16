<template>
  <div>    
    <canvas id="myLineChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

let chartInstance = null;

const { getToken } = useAuth();

const generateMonthlyLabels = () => {
  const months = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  
  for (let month = 0; month < 12; month++) {
    const date = new Date(currentYear, month, 1);
    months.push(date.toLocaleString('default', { month: 'long' }));
  }
  return months;
};

const getMonthlyIncome = (transactions) => {
  const monthlyTotals = new Array(12).fill(0);
  const currentYear = new Date().getFullYear();

  transactions
    .filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transaction.type === 'income' && 
             transactionDate.getFullYear() === currentYear;
    })
    .forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth();
      
      const cleanAmount = transaction.amount.toString().replace(/[^\d]/g, "");
      const amount = parseInt(cleanAmount, 10);
      if (!isNaN(amount)) {
        monthlyTotals[month] += amount;
      }
    });

  return monthlyTotals;
};

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
    const transactions = await response.json();

    const monthlyLabels = generateMonthlyLabels();
    const monthlyIncome = getMonthlyIncome(transactions);

    const data = {
      labels: monthlyLabels,
      datasets: [
        {
          data: monthlyIncome,
          fill: true,
          backgroundColor: 'rgba(17, 139, 80, 0.2)',
          borderColor: "rgb(17,139,80)",
          tension: 0.4,  
          pointBackgroundColor: "rgb(17,139,80)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(17,139,80)",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)', 
            },
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('id-ID', {
                  // style: 'currency',
                  // currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false 
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Income: ${new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(context.raw)}`;
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            displayColors: false
          }
        }
      }
    };

    const ctx = document.getElementById("myLineChart").getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, config);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>